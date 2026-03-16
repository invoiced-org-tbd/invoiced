import type { TranslationsShape } from './types';

export const brTranslations = {
	common: {
		name: 'Nome',
		email: 'E-mail',
		submit: 'Enviar',
		cancel: 'Cancelar',
		clear: 'Limpar',
		close: 'Fechar',
		edit: 'Editar',
		delete: 'Excluir',
		account: 'Conta',
		goBack: 'Voltar',
		logOut: 'Sair',
		lightMode: 'Modo claro',
		darkMode: 'Modo escuro',
		english: 'Ingles',
		portuguese: 'Portugues',
		yes: 'Sim',
		no: 'Nao',
		trueLabel: 'Verdadeiro',
		falseLabel: 'Falso',
		toggleOptions: 'Alternar opcoes',
		selectAll: 'Selecionar tudo',
		addItem: 'Adicionar item',
		removeItem: 'Remover item',
	},
	validation: {
		required: 'Este campo e obrigatorio',
		invalidType: 'Valor invalido',
		invalidEmail: 'Digite um e-mail valido',
		minCharacters: 'Digite pelo menos {minimum} caracteres',
	},
	a11y: {
		inputAction: 'Acao do campo',
		toggleSidebar: 'Alternar barra lateral',
		openColumnFilter: 'Abrir filtro da coluna',
		toggleColumnSorting: 'Alternar ordenacao da coluna',
		selectPageSize: 'Selecionar tamanho da pagina',
		goToPage: 'Ir para a pagina {page}',
		selectPage: 'Selecionar pagina',
		removeOption: 'Remover {option}',
	},
	dataTable: {
		filter: {
			title: 'Filtro',
			inputPlaceholder: 'Digite para filtrar...',
			clearButton: 'Limpar filtro',
		},
		footer: {
			rows: 'Linhas: {count}',
			rowsPerPage: 'Linhas por pagina',
			page: 'Pagina {page}',
		},
		emptyMessage: 'Nenhum resultado.',
		rowActions: 'Acoes da linha',
	},
	multiSelect: {
		placeholder: 'Selecione opcoes...',
		searchPlaceholder: 'Buscar opcoes...',
		more: '+{count} mais',
	},
	select: {
		placeholder: 'Selecione uma opcao...',
		emptyMessage: 'Nenhuma opcao encontrada',
	},
	account: {
		drawerTitle: 'Conta',
		form: {
			emailDescription: 'Gerenciado pela sua conta Google',
			saveChanges: 'Salvar alteracoes',
		},
		dangerZone: {
			title: 'Zona de perigo',
			description: 'Excluir conta permanentemente',
			intro: 'Antes de excluir sua conta, revise o que acontece em seguida:',
			itemDataRemoved:
				'Todos os dados do perfil e preferencias salvas serao removidos.',
			itemSessionsSignedOut:
				'Sessoes conectadas serao encerradas imediatamente.',
			itemCannotUndo: 'Esta acao nao pode ser desfeita apos a confirmacao.',
			areYouSure: 'Tem certeza?',
			deleteMyAccount: 'Excluir minha conta',
			deleteAccount: 'Excluir conta',
			notImplemented: 'Nao implementado',
		},
	},
	auth: {
		dashboardTitle: 'Painel',
		sidebar: {
			management: 'Gestao',
			contracts: 'Contratos',
		},
	},
	landing: {
		backgroundAlt: 'Fundo abstrato verde suave',
		signInWithGoogle: 'Entrar com Google',
		terms:
			'Ao continuar, voce concorda com os termos e politica de privacidade do app.',
	},
	createCompany: {
		title: 'Criar nova empresa',
		description:
			'Complete os dados da sua empresa para criar uma nova empresa.',
		backgroundAlt: 'Fundo abstrato verde suave',
		logoAlt: 'Logo da empresa',
		form: {
			nameLabel: 'Nome da empresa',
			namePlaceholder: 'Acme Inc.',
			nameDescription: 'Use o nome do seu negocio',
			emailPlaceholder: 'joao@acmeinc.com',
			submit: 'Criar empresa',
		},
	},
	root: {
		notFound: 'Nao encontrado',
		error: 'Erro',
	},
	server: {
		user: {
			accountUpdatedSuccess: 'Conta atualizada',
			accountDeletedSuccess: 'Conta excluida',
		},
	},
	login: {
		title: 'Página de login',
	},
	dashboard: {
		message: 'Bem-vindo de volta, {name}.',
	},
	contracts: {
		title: 'Contratos',
		newContract: 'Novo contrato',
		description: 'Descricao',
		role: {
			description: 'Descricao do cargo',
			rate: 'Valor',
			email: 'E-mail',
		},
		client: {
			companyName: 'Nome da empresa',
			responsibleName: 'Nome do responsavel',
			responsibleEmail: 'E-mail do responsavel',
		},
		autoSendConfiguration: {
			title: 'Configuracao de envio automatico',
			enabled: 'Habilitado',
			dayOfMonth: 'Dia do mes',
			percentage: 'Percentual',
		},
		upsertDrawer: {
			createTitle: 'Criar contrato',
			editTitle: 'Editar contrato',
		},
	},
} as const satisfies TranslationsShape;
