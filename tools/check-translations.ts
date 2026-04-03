/**
 * Reports translation keys defined in en-translations that appear unused in src.
 *
 * Limitations:
 * - Template-literal paths like t(`foo.${bar}`) are not detected.
 * - Renamed translation helpers (not named `t` / `translate`) are not scanned.
 *
 * Run: bun check:translations
 * Flags: --warn-only (exit 0 even when unused keys exist)
 */

import { Glob } from 'bun';
import { join, relative } from 'node:path';
import { enTranslations } from '../src/translations/en-translations.ts';

const toolsDirectory = import.meta.dirname;
const repoRoot = join(toolsDirectory, '..');
const sourceRoot = join(repoRoot, 'src');

const ADDRESS_TABLE_BASE_SUFFIX = 'db/tables/addressTableBase.ts';

const PATTERN_QUOTED_PATH_FRAGMENT = /['"]([a-zA-Z][\w.]*)['"]/g;
const PATTERN_LABEL_OR_DESCRIPTION_KEY =
	/\b(?:labelKey|descriptionKey)\s*:\s*['"]([a-zA-Z][\w.]*)['"]/g;
const PATTERN_COUNTRY_TRANSLATION_NAME =
	/name:\s*['"](countries\.[a-zA-Z][\w.]*)['"]/g;
const PATTERN_T_CALL = /\bt\s*\(/g;
const PATTERN_TRANSLATE_CALL = /\btranslate\s*\(/g;

function looksLikeTranslationKeyPath(candidate: string): boolean {
	return candidate.includes('.');
}

/** `openParenIndex` is the index of `(` that starts the argument list. */
function findClosingParen(source: string, openParenIndex: number): number {
	let nestingDepth = 1;
	let index = openParenIndex + 1;
	while (index < source.length && nestingDepth > 0) {
		const character = source[index];
		if (character === '/' && source[index + 1] === '/') {
			index += 2;
			while (index < source.length && source[index] !== '\n') {
				index++;
			}
			continue;
		}
		if (character === '/' && source[index + 1] === '*') {
			index += 2;
			while (index + 1 < source.length) {
				if (source[index] === '*' && source[index + 1] === '/') {
					index += 2;
					break;
				}
				index++;
			}
			continue;
		}
		if (character === "'" || character === '"') {
			const stringDelimiter = character;
			index++;
			while (index < source.length) {
				if (source[index] === '\\') {
					index += 2;
					continue;
				}
				if (source[index] === stringDelimiter) {
					index++;
					break;
				}
				index++;
			}
			continue;
		}
		if (character === '(') {
			nestingDepth++;
		} else if (character === ')') {
			nestingDepth--;
		}
		index++;
	}
	return index - 1;
}

function addKeysFromCallArgumentSlice(
	callArgumentSlice: string,
	usedKeys: Set<string>,
): void {
	for (const match of callArgumentSlice.matchAll(
		PATTERN_QUOTED_PATH_FRAGMENT,
	)) {
		const captured = match[1];
		if (captured !== undefined && looksLikeTranslationKeyPath(captured)) {
			usedKeys.add(captured);
		}
	}
}

function addKeysFromTranslateAndTCalls(
	sourceText: string,
	usedKeys: Set<string>,
): void {
	for (const match of sourceText.matchAll(PATTERN_T_CALL)) {
		const openParenIndex = match.index + match[0].length - 1;
		const closeParenIndex = findClosingParen(sourceText, openParenIndex);
		const callArgumentSlice = sourceText.slice(
			openParenIndex + 1,
			closeParenIndex,
		);
		addKeysFromCallArgumentSlice(callArgumentSlice, usedKeys);
	}
	for (const match of sourceText.matchAll(PATTERN_TRANSLATE_CALL)) {
		const openParenIndex = match.index + match[0].length - 1;
		const closeParenIndex = findClosingParen(sourceText, openParenIndex);
		const callArgumentSlice = sourceText.slice(
			openParenIndex + 1,
			closeParenIndex,
		);
		addKeysFromCallArgumentSlice(callArgumentSlice, usedKeys);
	}
}

function flattenTranslationKeys(value: unknown, pathPrefix: string): string[] {
	if (typeof value === 'string') {
		return pathPrefix ? [pathPrefix] : [];
	}
	if (typeof value !== 'object' || value === null || Array.isArray(value)) {
		return [];
	}
	const leafPaths: string[] = [];
	for (const [objectKey, nestedValue] of Object.entries(value)) {
		const extendedPrefix = pathPrefix
			? `${pathPrefix}.${objectKey}`
			: objectKey;
		leafPaths.push(...flattenTranslationKeys(nestedValue, extendedPrefix));
	}
	return leafPaths;
}

function extractFirstCaptureGroup(
	sourceText: string,
	pattern: RegExp,
): Set<string> {
	const matches = new Set<string>();
	for (const match of sourceText.matchAll(pattern)) {
		const captured = match[1];
		if (captured !== undefined) {
			matches.add(captured);
		}
	}
	return matches;
}

function collectDynamicTCallHints(
	sourceText: string,
	pathRelativeToRepo: string,
): string[] {
	const sourceLines = sourceText.split('\n');
	const hints: string[] = [];
	for (const match of sourceText.matchAll(PATTERN_T_CALL)) {
		let scanIndex = match.index + match[0].length;
		while (scanIndex < sourceText.length && /\s/.test(sourceText[scanIndex])) {
			scanIndex++;
		}
		const firstArgumentChar = sourceText[scanIndex];
		if (
			firstArgumentChar !== "'" &&
			firstArgumentChar !== '"' &&
			firstArgumentChar !== '`'
		) {
			const lineNumber = sourceText.slice(0, match.index).split('\n').length;
			const lineText = sourceLines[lineNumber - 1]?.trim() ?? '';
			hints.push(`${pathRelativeToRepo}:${lineNumber} ${lineText}`);
		}
	}
	return hints;
}

const warnOnly = process.argv.includes('--warn-only');

const definedKeys = new Set(flattenTranslationKeys(enTranslations, ''));
const usedKeys = new Set<string>();
const dynamicUsageHints: string[] = [];

const typescriptSourceGlob = new Glob('**/*.{ts,tsx}');

for (const absoluteSourcePath of typescriptSourceGlob.scanSync({
	cwd: sourceRoot,
	onlyFiles: true,
	absolute: true,
})) {
	const sourceText = await Bun.file(absoluteSourcePath).text();
	const pathRelativeToRepo = relative(repoRoot, absoluteSourcePath);

	addKeysFromTranslateAndTCalls(sourceText, usedKeys);

	for (const translationKey of extractFirstCaptureGroup(
		sourceText,
		PATTERN_LABEL_OR_DESCRIPTION_KEY,
	)) {
		usedKeys.add(translationKey);
	}

	const normalizedRelativePath = pathRelativeToRepo.replaceAll('\\', '/');
	if (normalizedRelativePath.endsWith(ADDRESS_TABLE_BASE_SUFFIX)) {
		for (const countryKey of extractFirstCaptureGroup(
			sourceText,
			PATTERN_COUNTRY_TRANSLATION_NAME,
		)) {
			usedKeys.add(countryKey);
		}
	}

	dynamicUsageHints.push(
		...collectDynamicTCallHints(sourceText, pathRelativeToRepo),
	);
}

const unusedDefinedKeys = [...definedKeys]
	.filter((translationKey) => !usedKeys.has(translationKey))
	.sort();
const orphanedReferencedKeys = [...usedKeys]
	.filter((translationKey) => !definedKeys.has(translationKey))
	.sort();

console.log(`Defined keys: ${definedKeys.size}`);
console.log(`Used keys (static heuristics): ${usedKeys.size}`);
console.log('');

if (unusedDefinedKeys.length > 0) {
	console.log(`Unused keys (${unusedDefinedKeys.length}):`);
	for (const translationKey of unusedDefinedKeys) {
		console.log(`  ${translationKey}`);
	}
	console.log('');
} else {
	console.log('No unused keys detected.\n');
}

if (orphanedReferencedKeys.length > 0) {
	console.log(
		`Strings referenced like translation keys but not in enTranslations (${orphanedReferencedKeys.length}) — possible typos:`,
	);
	for (const translationKey of orphanedReferencedKeys) {
		console.log(`  ${translationKey}`);
	}
	console.log('');
}

if (dynamicUsageHints.length > 0) {
	console.log(
		`Non-literal t(...) first argument (${dynamicUsageHints.length} lines) — verify these keys are covered elsewhere:`,
	);
	for (const hintLine of dynamicUsageHints) {
		console.log(`  ${hintLine}`);
	}
	console.log('');
}

if (unusedDefinedKeys.length > 0 && !warnOnly) {
	process.exit(1);
}
