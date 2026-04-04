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
		next: 'Próximo',
		unknownError: 'Ocorreu um erro desconhecido',
	},
	form: {
		unsavedChanges: {
			title: 'Alterações não salvas',
			description:
				'Você tem alterações não salvas. Tem certeza de que deseja sair?',
			discardAndLeave: 'Descartar e sair',
			stay: 'Permanecer',
		},
	},
	countries: {
		notFound: 'País {country} não encontrado',
		unitedStates: 'Estados Unidos',
		brazil: 'Brasil',
		canada: 'Canadá',
		australia: 'Austrália',
		unitedKingdom: 'Reino Unido',
		argentina: 'Argentina',
		portugal: 'Portugal',
		mexico: 'México',
		germany: 'Alemanha',
		estonia: 'Estônia',
		austria: 'Áustria',
		lithuania: 'Lituânia',
		netherlands: 'Países Baixos',
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
			emailDescription: 'Gerenciado pela sua conta do Google',
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
			settings: {
				group: 'Configurações',
			},
		},
		server: {
			accountUpdatedSuccess: 'Sua conta foi atualizada',
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
				profile: {
					title: 'Perfil da empresa',
					description:
						'Seu ambiente de trabalho está vinculado a um único registro de empresa.',
					noAddress: 'Endereço não informado',
				},
				zeroState: {
					title: 'Crie o perfil da sua empresa',
					description:
						'Configure sua empresa uma vez para liberar faturas e dados empresariais no app.',
					primaryAction: 'Criar empresa',
				},
				drawer: {
					title: 'Criar empresa',
					description: 'Adicione os dados da sua empresa para continuar.',
					editTitle: 'Editar empresa',
					editDescription: 'Atualize os dados e o endereço da sua empresa.',
					saveAction: 'Salvar alterações',
				},
			},
			automations: {
				title: 'Automações',
				description: 'Configure provedores SMTP e templates de e-mail.',
				actions: {
					add: 'Adicionar',
					duplicate: 'Duplicar',
				},
				copySuffix: '(cópia)',
				smtp: {
					title: 'Configurações SMTP',
					description: 'Gerencie seus provedores de envio de e-mail.',
					senderLabel: 'E-mail remetente',
					hostLabel: 'Host / Porta',
					presets: {
						label: 'Preset de provedor',
						description:
							'Selecione um provedor para preencher host, porta e segurança.',
						placeholder: 'Selecione um provedor...',
						applyAction: 'Aplicar preset',
						providers: {
							gmail: 'Gmail',
							outlook: 'Outlook (Microsoft 365)',
							mailgun: 'Mailgun',
							sendgrid: 'SendGrid',
						},
					},
					securityModes: {
						starttls: 'STARTTLS',
						sslTls: 'SSL/TLS',
						none: 'Nenhum',
					},
					emptyState: {
						title: 'Nenhuma configuração SMTP ainda',
						description:
							'Adicione seu primeiro provedor SMTP para começar a enviar e-mails transacionais.',
					},
					deleteBlockedByContractAutoSend:
						'Esta configuração SMTP está em uso no envio automático de faturas de um contrato. Desative ou altere o envio automático nesses contratos antes de excluir.',
					drawer: {
						title: 'Criar configuração SMTP',
						description: 'Defina host, remetente e opções de segurança.',
						editTitle: 'Editar configuração SMTP',
						editDescription: 'Atualize a conexão SMTP e os dados de remetente.',
						createAction: 'Criar SMTP',
						saveAction: 'Salvar alterações',
					},
					form: {
						nameLabel: 'Nome da configuração',
						namePlaceholder: 'SMTP principal',
						usernameLabel: 'Usuário',
						usernamePlaceholder: 'usuario-smtp',
						usernameHint:
							'Em geral, é o login SMTP — muitas vezes um e-mail ou o usuário do provedor.',
						fromNameLabel: 'Nome do remetente',
						fromNamePlaceholder: 'Equipe de faturamento',
						fromEmailLabel: 'E-mail remetente',
						fromEmailPlaceholder: 'faturamento@acme.com',
						fromEmailHint:
							'Endereço que o destinatário verá como remetente na caixa de entrada.',
						hostLabel: 'Host',
						hostPlaceholder: 'smtp.mailgun.org',
						hostHint: 'Host do servidor SMTP fornecido pelo seu provedor.',
						portLabel: 'Porta',
						portHint:
							'Portas comuns: 587 (STARTTLS), 465 (SSL/TLS) ou 25 (sem criptografia).',
						securityLabel: 'Segurança',
						securityHint:
							'Deve corresponder ao provedor. STARTTLS costuma ser o mais comum.',
						passwordLabel: 'Senha',
						passwordPlaceholder: 'Digite sua senha SMTP',
						passwordDescription: 'Armazenada com segurança e nunca exibida.',
						passwordEditPlaceholder:
							'Deixe em branco para manter a senha atual',
						passwordEditDescription:
							'Por segurança, a senha atual nunca é exibida.',
					},
				},
				emailTemplates: {
					title: 'Templates de e-mail',
					description: 'Crie e mantenha templates reutilizáveis de e-mail.',
					subjectLabel: 'Prévia do assunto',
					updatedAtLabel: 'Atualizado em',
					emptyState: {
						title: 'Nenhum template de e-mail ainda',
						description:
							'Crie seu primeiro template para padronizar a comunicação de faturas.',
					},
					deleteBlockedByContractAutoSend:
						'Este template está em uso no envio automático de faturas de um contrato. Desative ou altere o envio automático nesses contratos antes de excluir.',
					drawer: {
						title: 'Criar template de e-mail',
						description: 'Defina o tipo e o assunto do template.',
						editTitle: 'Editar template de e-mail',
						editDescription: 'Ajuste os detalhes e o status do template.',
						createAction: 'Criar template',
						saveAction: 'Salvar alterações',
					},
					form: {
						nameLabel: 'Nome do template',
						namePlaceholder: 'Lembrete de fatura',
						slugLabel: 'Slug',
						slugPlaceholder: 'lembrete-fatura',
						subjectLabel: 'Assunto',
						subjectPlaceholder: 'Lembrete: sua fatura vence em breve',
						bodyLabel: 'Corpo',
						bodyPlaceholder: 'Olá cliente, sua fatura está pronta.',
					},
				},
			},
			notifications: {
				title: 'Notificações',
				description: 'Gerencie suas notificações.',
			},
			billingPlans: {
				title: 'Faturamento e planos',
				description:
					'Revise seu plano ativo, método de pagamento e faturas recentes.',
				paymentMethod: {
					title: 'Método de pagamento selecionado',
					description: 'Este é o cartão usado nas renovações da assinatura.',
					methodLabel: 'Cartão',
					defaultBadge: 'Padrão',
					holderLabel: 'Titular do cartão',
					expiresLabel: 'Validade',
				},
				selectedPlan: {
					title: 'Plano selecionado',
					description: 'Visão geral do seu plano de assinatura atual.',
					planLabel: 'Plano',
					activeBadge: 'Ativo',
					priceLabel: 'Preço',
					renewalLabel: 'Renova em',
				},
				history: {
					title: 'Histórico de faturamento',
					description: 'Acompanhe sua atividade de cobrança mensal.',
					period: 'Período',
					invoice: 'Fatura',
					issuedAt: 'Emitida em',
					amount: 'Valor',
					status: 'Status',
					statuses: {
						paid: 'Pago',
						processing: 'Processando',
						pending: 'Pendente',
						failed: 'Falhou',
					},
				},
			},
		},
	},
	createCompany: {
		form: {
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
			cityPlaceholder: 'São Paulo',
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
		list: {
			addContract: 'Adicionar contrato',
			createInvoice: 'Criar fatura',
			pageDescription:
				'Uma visualização mais elegante para contratos, feita para um ou muitos clientes.',
			listDescription:
				'Selecione um contrato para ver os detalhes no painel à direita.',
			count: '{count} no total',
			singleLabel: 'Contrato atual',
			singleBadge: 'Selecionado',
			emptyBadge: 'Sem contratos',
			emptyTitle: 'Comece com seu primeiro contrato',
			emptyDescription:
				'Adicione um contrato para liberar o fluxo de faturamento e automações.',
			emptyCta: 'Criar contrato',
			recurrenceValue: '{count} item(ns) de recorrência',
			autoSendOn: 'Envio automático ativado',
			autoSendOff: 'Envio automático desativado',
			roleLabel: 'Cargo',
			updatedAtLabel: 'Última atualização',
			financialDetails: 'Informações financeiras',
			monthlyRate: 'Remuneração mensal',
			billingContact: 'Contato para faturamento',
			addressLabel: 'Endereço',
			paymentSchedule: 'Calendário de cobrança',
			recurrenceEveryLabel: 'Todo',
			recurrenceDayLabel: 'Dia',
		},
		zeroState: {
			withCompany: {
				badge: 'Sem contratos ainda',
				title: 'Comece com seu primeiro contrato',
				description:
					'Escolha um cliente, defina a frequência das faturas e quando serão enviadas. Você pode alterar esses detalhes depois.',
				cta: 'Criar seu primeiro contrato',
				ariaConfigure: 'O que você irá configurar',
				roleTitle: 'Sua função',
				roleDescription: 'Como você é apresentado neste contrato.',
				clientProjectTitle: 'Cliente e projeto',
				clientProjectDescription:
					'Quem será cobrado e como o trabalho se chama.',
				scheduleSendingTitle: 'Agenda e envio',
				scheduleSendingDescription:
					'Com que frequência as faturas são emitidas e se serão enviadas por e-mail automaticamente.',
			},
			withoutCompany: {
				badge: 'Empresa obrigatória',
				title: 'Configure sua empresa primeiro',
				description:
					'O contrato precisa de um perfil de empresa para que as faturas exibam o nome legal, e-mail e endereço corretos. Adicione em configurações e volte aqui.',
				cta: 'Configurar sua empresa',
				ariaNextSteps: 'Próximos passos',
				step1Label: 'Passo 1',
				step1Title: 'Empresa',
				step1Description: 'Nome, e-mail de contato e endereço de cobrança.',
				step2Label: 'Passo 2',
				step2Title: 'Primeiro contrato',
				step2Description:
					'Cliente, agenda e regras de faturamento, depois que sua empresa existir.',
			},
		},
		form: {
			role: {
				descriptionLabel: 'Descrição do cargo',
				rateLabel: 'Valor',
			},
			invoiceRecurrence: {
				sectionTitle: 'Recorrência de faturas',
				sectionDescription: 'Defina a recorrência de faturas para o contrato.',
				dayOfMonthLabel: 'Dia do mês',
				dayOfMonthSuffix: '{suffix} dia do mês',
				percentageLabel: 'Porcentagem',
				totalPercentageLabel: 'Porcentagem total: {value}%',
				totalPercentageInvalidHint: '(deve ser 100%)',
				balancePercentagesLabel: 'Balanceamento de porcentagens',
				balancePercentagesTooltip:
					'Balanceia automaticamente as porcentagens para 100% ao adicionar ou remover itens',
				validation: {
					totalPercentageMustBe100: 'A porcentagem total deve ser 100',
					duplicateDayOfMonth: 'Dia do mês duplicado',
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
			autoSend: {
				sectionTitle: 'Envio automático de faturas',
				sectionDescription:
					'Envie faturas por e-mail automaticamente usando suas configurações de SMTP e templates.',
				loading: 'Carregando configurações de automação…',
				zeroState: {
					title: 'Falta SMTP ou template de e-mail',
					description:
						'Adicione ao menos uma configuração SMTP e um template de e-mail em Configurações > Automações antes de ativar o envio automático.',
					cta: 'Abrir Automações',
				},
				enabledLabel: 'Ativar envio automático',
				enabledDescription:
					'Quando ativado, as faturas deste contrato podem ser enviadas por e-mail com as opções abaixo.',
				smtpLabel: 'Configuração SMTP',
				smtpDescription: 'Servidor de e-mail usado para enviar as faturas.',
				smtpPlaceholder: 'Selecione o SMTP',
				templateLabel: 'Template de e-mail',
				templateDescription:
					'Template aplicado ao assunto e corpo dos e-mails de fatura.',
				templatePlaceholder: 'Selecione o template',
				validation: {
					smtpRequired:
						'Selecione uma configuração SMTP quando o envio automático estiver ativado.',
					templateRequired:
						'Selecione um template de e-mail quando o envio automático estiver ativado.',
				},
				invalidSmtpConfiguration:
					'A configuração SMTP selecionada não foi encontrada ou não pertence à sua conta.',
				invalidEmailTemplate:
					'O template de e-mail selecionado não foi encontrado ou não pertence à sua conta.',
			},
		},
		tabs: {
			role: 'Cargo',
			client: 'Cliente',
			invoiceRecurrence: 'Recorrência de faturas',
			autoSend: 'Envio automático',
		},
		summary: {
			title: 'Resumo do contrato',
			description:
				'Revise os detalhes do contrato abaixo antes de enviar suas alterações.',
			badge: 'Revisão',
			activeContractLabel: 'Contrato ativo',
			activeContractValue:
				'Você tem um contrato ativo com {companyName} como {roleDescription}.',
			activeContractMissing:
				'A empresa cliente e o cargo ainda não foram definidos por completo.',
			salaryLabel: 'Salário',
			salaryMissing: 'O salário ainda não foi definido.',
			billingLabel: 'Contato para faturamento',
			billingValue: 'As faturas serão enviadas para {name} ({email}).',
			billingMissing:
				'Os dados do contato de faturamento ainda não foram preenchidos.',
			missingInformationHint:
				'Adicione estas informações para completar o resumo.',
			autoSendLabel: 'Envio automático',
			autoSendValue: '{smtpName} · template "{templateName}"',
			autoSendOff: 'Envio automático desligado para este contrato.',
			autoSendIncomplete:
				'Selecione SMTP e template para concluir o envio automático.',
			autoSendIncompleteHint:
				'Abra a etapa Envio automático e escolha uma configuração SMTP e um template de e-mail.',
		},
		invoicePreview: {
			previewButton: 'Visualizar PDF',
			title: 'Pré-visualização da fatura',
			description:
				'Esta pré-visualização é atualizada com os valores atuais do formulário.',
			incompleteFieldsHint:
				'Alguns campos estão incompletos. A pré-visualização pode mostrar valores de exemplo.',
		},
		invoiceConfigurationSetup: {
			title: 'Nome do arquivo da fatura e numeração',
			introLead:
				'Este é o seu primeiro contrato. Defina como os nomes dos arquivos de fatura serão gerados e a partir de qual número continuar.',
			introExisting:
				'Se você já emite faturas fora do app, use o mesmo padrão e informe o último número para manter a sequência.',
			patternSectionTitle: 'Prefixo e sufixo',
			includeSectionTitle: 'Incluir no nome do arquivo',
			previewCaption: 'Exemplo de nome de arquivo',
			numberingSectionTitle: 'Numeração',
			prefixLabel: 'Prefixo',
			suffixLabel: 'Sufixo',
			withYearLabel: 'Ano',
			withMonthLabel: 'Mês',
			withDayLabel: 'Dia',
			withCompanyNameLabel: 'Nome da empresa',
			lastInvoiceNumberLabel: 'Último número da fatura',
			numberingTabNewLabel: 'Começando agora',
			numberingTabExistingLabel: 'Já emito faturas fora do app',
			numberingNewTabHint: 'Sua primeira fatura no app começará no número 1.',
			numberingExistingTabHint:
				'Informe o último número de fatura usado fora do app para a sequência continuar.',
			finishSetup: 'Concluir configuração',
			alreadyExistsForUser:
				'Já existe uma configuração de fatura para este usuário.',
		},
	},
	invoices: {
		name: 'Fatura',
		title: 'Faturas',
		list: {
			emptyState: 'Nenhuma fatura ainda.',
			createInvoice: 'Criar fatura',
			viewInvoice: 'Ver fatura',
			deleteInvoice: 'Excluir fatura',
			itemSingular: 'item',
			itemPlural: 'itens',
			itemsCount: '{count} itens',
			sections: {
				financial: 'Financeiro',
				client: 'Cliente',
				issue: 'Emissão',
				items: 'Itens',
			},
			labels: {
				totalAmount: 'Valor total',
				company: 'Empresa',
				issueDate: 'Data de emissão',
				invoiceItem: 'Item da fatura',
			},
			noItems: 'Nenhum item nesta fatura.',
		},
		creation: {
			drawerTitle: 'Criação de fatura',
			form: {
				recurrenceLabel: 'Recorrência',
			},
			validation: {
				itemsRequiredInCustomMode:
					'Os itens são obrigatórios no modo personalizado',
			},
		},
		server: {
			invoiceConfigurationRequired:
				'Configure as opções de fatura antes de criar faturas',
			recurrenceItemNotFound: 'Item de recorrência não encontrado',
			notFound: 'Fatura não encontrada',
			deletedSuccess: 'Fatura excluída',
		},
	},
	onboarding: {
		title: 'Onboarding',
		completed: '{completed}/{total} concluídos',
		sections: {
			coreSetup: 'Configuração básica',
			advancedSetup: 'Configuração avançada',
		},
		actions: {
			dismiss: 'Dispensar onboarding',
			open: 'Abrir',
			markAsDone: 'Marcar como concluído',
			markAsNotDone: 'Marcar como pendente',
		},
		steps: {
			company: {
				label: 'Crie sua empresa',
				description:
					'Configure os dados da sua empresa e as informações legais.',
			},
			contract: {
				label: 'Adicione seu primeiro contrato',
				description: 'Crie ao menos um contrato para começar a cobrar.',
			},
			invoice: {
				label: 'Envie uma fatura',
				description: 'Marque quando sua primeira fatura for enviada.',
			},
			smtp: {
				label: 'Configure o SMTP',
				description: 'Configure seu provedor SMTP para envio de e-mails.',
			},
			emailTemplates: {
				label: 'Configure os templates de e-mail',
				description: 'Defina templates padrão para e-mails de fatura.',
			},
		},
	},
	pdfCanvasViewer: {
		loading: {
			generatingPreview: 'Gerando pré-visualização do PDF...',
		},
		error: {
			renderFailed: 'Não foi possível renderizar a pré-visualização do PDF.',
			unavailable: 'A pré-visualização do PDF não está disponível no momento.',
		},
	},
} as const satisfies TranslationsShape;
