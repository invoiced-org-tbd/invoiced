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
		english: 'Inglês',
		portuguese: 'Português',
		yes: 'Sim',
		no: 'Não',
		trueLabel: 'Verdadeiro',
		falseLabel: 'Falso',
		toggleOptions: 'Alternar opções',
		selectAll: 'Selecionar tudo',
		addItem: 'Adicionar item',
		removeItem: 'Remover item',
		next: 'Próximo',
		unknownError: 'Ocorreu um erro desconhecido',
		day: 'Dia',
	},
	countries: {
		notFound: 'País {country} não encontrado',
		unitedStates: 'Estados Unidos',
		brazil: 'Brasil',
		canada: 'Canada',
		australia: 'Australia',
		unitedKingdom: 'Reino Unido',
		argentina: 'Argentina',
		portugal: 'Portugal',
		mexico: 'Mexico',
		germany: 'Alemanha',
		estonia: 'Estonia',
		austria: 'Austria',
		lithuania: 'Lituania',
		netherlands: 'Paises Baixos',
	},
	entity: {
		notFound: '{entity} não encontrado',
		deletedSuccess: '{entity} excluído com sucesso',
		addTitle: 'Adicionar {entity}',
		editTitle: 'Editar {entity}',
		deleteTitle: 'Excluir {entity}',
		deleteConfirmation: 'Tem certeza de que deseja excluir este {entity}?',
	},
	validation: {
		required: 'Este campo é obrigatório',
		invalidType: 'Valor inválido',
		invalidEmail: 'Digite um e-mail válido',
		minCharacters: 'Digite pelo menos {minimum} caracteres',
		minNumber: 'Digite um valor maior ou igual a {minimum}',
		maxCharacters: 'Digite no máximo {maximum} caracteres',
		maxNumber: 'Digite um valor menor ou igual a {maximum}',
	},
	a11y: {
		inputAction: 'Ação do campo',
		toggleSidebar: 'Alternar barra lateral',
		openColumnFilter: 'Abrir filtro da coluna',
		toggleColumnSorting: 'Alternar ordenação da coluna',
		selectPageSize: 'Selecionar tamanho da página',
		goToPage: 'Ir para a página {page}',
		selectPage: 'Selecionar página',
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
			rowsPerPage: 'Linhas por página',
			page: 'Página {page}',
		},
		emptyMessage: 'Nenhum resultado.',
		rowActions: 'Ações da linha',
	},
	multiSelect: {
		placeholder: 'Selecione opções...',
		searchPlaceholder: 'Buscar opções...',
		more: '+{count} mais',
	},
	select: {
		placeholder: 'Selecione uma opção...',
		emptyMessage: 'Nenhuma opção encontrada',
	},
	account: {
		drawerTitle: 'Conta',
		form: {
			emailDescription: 'Gerenciado pela sua conta Google',
			saveChanges: 'Salvar alterações',
		},
		dangerZone: {
			title: 'Zona de perigo',
			description: 'Excluir conta permanentemente',
			intro: 'Antes de excluir sua conta, revise o que acontece em seguida:',
			itemDataRemoved:
				'Todos os dados do perfil e preferências salvas serão removidos.',
			itemSessionsSignedOut:
				'Sessões conectadas serão encerradas imediatamente.',
			itemCannotUndo: 'Esta ação não pode ser desfeita após a confirmação.',
			areYouSure: 'Tem certeza?',
			deleteMyAccount: 'Excluir minha conta',
			deleteAccount: 'Excluir conta',
		},
	},
	auth: {
		dashboardTitle: 'Painel',
		sidebar: {
			management: 'Gestão',
			contracts: 'Contratos',
			invoices: 'Faturas',
			cashflow: 'Fluxo de caixa',
			receivableDebtAccounts: 'Contas a receber/pagar',
			settings: {
				group: 'Configurações',
				company: 'Empresa',
				automation: 'Automação',
			},
		},
		server: {
			accountUpdatedSuccess: 'Sua conta foi atualizada',
			accountDeletedSuccess: 'Sua conta foi excluida',
		},
	},
	settings: {
		title: 'Configurações',
		tabs: {
			account: {
				title: 'Conta',
				description: 'Gerencie suas informações de conta.',
			},
			company: {
				title: 'Empresa',
				description: 'Gerencie suas informações de empresa.',
			},
			automations: {
				title: 'Automações',
				description: 'Gerencie suas automações.',
			},
			notifications: {
				title: 'Notificações',
				description: 'Gerencie suas notificações.',
			},
			plans: {
				title: 'Planos',
				description: 'Gerencie seus planos.',
			},
			billing: {
				title: 'Faturamento',
				description: 'Gerencie suas informações de faturamento.',
			},
		},
		placeholderDescription: 'Esta seção estará disponível em breve.',
	},
	landing: {
		backgroundAlt: 'Fundo abstrato verde suave',
		signInWithGoogle: 'Entrar com Google',
		terms:
			'Ao continuar, você concorda com os termos e política de privacidade do app.',
	},
	createCompany: {
		title: 'Criar nova empresa',
		description:
			'Complete os dados da sua empresa para criar uma nova empresa.',
		backgroundAlt: 'Fundo abstrato verde suave',
		logoAlt: 'Logo da empresa',
		form: {
			companySectionTitle: 'Informações da empresa',
			nameLabel: 'Nome da empresa',
			namePlaceholder: 'Acme Inc.',
			nameDescription: 'Use o nome do seu negócio',
			emailPlaceholder: 'joao@acmeinc.com',
			addressSectionTitle: 'Endereço',
			street1Label: 'Rua',
			street1Placeholder: 'Rua Principal',
			street2Label: 'Complemento',
			street2Placeholder: 'Apto, sala, bloco, andar',
			numberLabel: 'Número',
			numberPlaceholder: '123',
			postalCodeLabel: 'CEP',
			postalCodePlaceholder: '01001-000',
			cityLabel: 'Cidade',
			cityPlaceholder: 'Sao Paulo',
			stateLabel: 'Estado',
			statePlaceholder: 'SP',
			countryLabel: 'País',
			countryPlaceholder: 'Brasil',
			submit: 'Criar empresa',
		},
	},
	root: {
		notFound: 'Não encontrado',
		error: 'Erro',
	},
	dashboard: {
		message: 'Bem-vindo de volta, {name}.',
	},
	contracts: {
		name: 'Contrato',
		title: 'Contratos',
		form: {
			descriptionLabel: 'Descrição',
			role: {
				descriptionLabel: 'Descrição do cargo',
				rateLabel: 'Valor',
				emailLabel: 'E-mail',
			},
			invoiceRecurrence: {
				sectionTitle: 'Recorrencia de faturas',
				sectionDescription: 'Defina a recorrencia de faturas para o contrato.',
				dayOfMonthLabel: 'Dia do mês',
				dayOfMonthSuffix: '{suffix} dia do mês',
				percentageLabel: 'Porcentagem',
				totalPercentageLabel: 'Porcentagem total: {value}%',
				totalPercentageInvalidHint: '(deve ser 100%)',
				validation: {
					totalPercentageMustBe100: 'A porcentagem total deve ser 100',
					duplicateDayOfMonth: 'Dia do mes duplicado',
				},
			},
			client: {
				companyNameLabel: 'Nome da empresa',
				responsibleNameLabel: 'Nome do responsável',
				responsibleEmailLabel: 'E-mail do responsável',
				address: {
					sectionTitle: 'Endereço do cliente',
					street1Label: 'Rua',
					street2Label: 'Complemento',
					numberLabel: 'Número',
					postalCodeLabel: 'CEP',
					cityLabel: 'Cidade',
					stateLabel: 'Estado',
					countryLabel: 'País',
				},
			},
		},
		tabs: {
			role: 'Cargo',
			client: 'Cliente',
			invoiceRecurrence: 'Recorrencia de Invoices',
		},
		summary: {
			title: 'Resumo do contrato',
			description:
				'Revise os detalhes do contrato abaixo antes de enviar suas alteracoes.',
			badge: 'Revisao',
			activeContractLabel: 'Contrato ativo',
			activeContractValue:
				'Voce tem um contrato ativo com {companyName} como {roleDescription}.',
			activeContractMissing:
				'A empresa cliente e o cargo ainda nao foram definidos por completo.',
			contractDescriptionLabel: 'Descricao',
			salaryLabel: 'Salario',
			salaryMissing: 'O salario ainda nao foi definido.',
			billingLabel: 'Contato de faturamento',
			billingValue: 'As faturas serao enviadas para {name} ({email}).',
			billingMissing:
				'Os dados do contato de faturamento ainda nao foram preenchidos.',
			missingInformationHint:
				'Adicione estas informacoes para completar o resumo.',
		},
		invoicePreview: {
			previewButton: 'Visualizar PDF',
			title: 'Pre-visualizacao da fatura',
			description:
				'Esta pre-visualizacao e atualizada com os valores atuais do formulario.',
			browserOnlyMessage:
				'A pre-visualizacao do PDF esta disponivel no navegador.',
			incompleteFieldsHint:
				'Alguns campos estao incompletos. A pre-visualizacao pode mostrar placeholders.',
		},
	},
	invoices: {
		title: 'Faturas',
	},
	onboarding: {
		title: 'Onboarding',
		completed: '{completed}/{total} concluidos',
		sections: {
			coreSetup: 'Configuracao base',
			advancedSetup: 'Configuração avançada',
		},
		actions: {
			dismiss: 'Dispensar onboarding',
			open: 'Abrir',
			markAsDone: 'Marcar como concluido',
			markAsNotDone: 'Marcar como pendente',
		},
		steps: {
			company: {
				label: 'Crie sua empresa',
				description: 'Configure os dados da sua empresa e informacoes legais.',
			},
			contract: {
				label: 'Adicione seu primeiro contrato',
				description: 'Crie ao menos um contrato para comecar a cobrar.',
			},
			invoice: {
				label: 'Envie uma fatura',
				description: 'Marque isso quando sua primeira fatura for enviada.',
			},
			smtp: {
				label: 'Configure o SMTP',
				description: 'Configure seu provedor SMTP para envio de e-mails.',
			},
			emailTemplates: {
				label: 'Configure os templates de e-mail',
				description: 'Defina templates padrao para e-mails de fatura.',
			},
		},
	},
	pdfCanvasViewer: {
		loading: {
			generatingPreview: 'Gerando pre-visualizacao do PDF...',
		},
		error: {
			renderFailed: 'Nao foi possivel renderizar a pre-visualizacao do PDF.',
			unavailable: 'A pre-visualizacao do PDF nao esta disponivel no momento.',
		},
	},
} as const satisfies TranslationsShape;
