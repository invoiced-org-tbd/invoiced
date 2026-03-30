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
				profile: {
					title: 'Perfil da empresa',
					description:
						'Seu workspace está vinculado a um único registro de empresa.',
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
				status: {
					active: 'Ativo',
					inactive: 'Inativo',
				},
				shared: {
					addAction: 'Adicionar',
					duplicateAction: 'Duplicar',
					updatedAtLabel: 'Atualizado em',
					copySuffix: '(cópia)',
					status: {
						active: 'Ativo',
						inactive: 'Inativo',
					},
				},
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
						tls: 'TLS',
						ssl: 'SSL',
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
							'Normalmente é o login SMTP, geralmente e-mail ou usuário do provedor.',
						fromNameLabel: 'Nome do remetente',
						fromNamePlaceholder: 'Time de faturamento',
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
						statusLabel: 'Status',
						statusDescription: 'Ative para usar esta configuração SMTP.',
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
					types: {
						invoice: 'Fatura',
						reminder: 'Lembrete',
						overdue: 'Vencido',
					},
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
						typeLabel: 'Tipo do template',
						subjectLabel: 'Assunto',
						subjectPlaceholder: 'Lembrete: sua fatura vence em breve',
						bodyLabel: 'Corpo',
						bodyPlaceholder: 'Olá cliente, sua fatura está pronta.',
						statusLabel: 'Status',
						statusDescription: 'Ative para usar este template nas automações.',
					},
				},
			},
			notifications: {
				title: 'Notificações',
				description: 'Gerencie suas notificações.',
			},
			billingPlans: {
				title: 'Faturamento e Planos',
				description:
					'Revise seu plano ativo, método de pagamento e faturas recentes.',
				paymentMethod: {
					title: 'Método de pagamento selecionado',
					description: 'Este é o cartão usado nas renovações da assinatura.',
					methodLabel: 'Cartão',
					defaultBadge: 'Padrão',
					holderLabel: 'Titular',
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
			autoSend: {
				sectionTitle: 'Envio automático de faturas',
				sectionDescription:
					'Opcionalmente envie faturas por e-mail automaticamente usando seu SMTP e templates.',
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
			invoiceRecurrence: 'Recorrencia de Invoices',
			autoSend: 'Envio automático',
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
			title: 'Pre-visualizacao da fatura',
			description:
				'Esta pre-visualizacao e atualizada com os valores atuais do formulario.',
			browserOnlyMessage:
				'A pre-visualizacao do PDF esta disponivel no navegador.',
			missingCompanyHint:
				'Configure sua empresa em Configuracoes > Empresa para gerar a pre-visualizacao.',
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
