# 🎨 Interface de Competências - Mockup Visual

## Fluxo de Uso do Candidato

### 1️⃣ Perfil Inicial (Modo Visualização)

```
┌─────────────────────────────────────────────────────────────┐
│                    👤 MEU PERFIL                 ✎ EDITAR   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Foto]  Nome: João Silva                                   │
│          Email: joao@email.com                              │
│          Telefone: (11) 99999-9999                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  COMPETÊNCIAS                                               │
│                                                              │
│  ✓ Liderança    ✓ Comunicação    ✓ Trabalho em Equipe      │
│  ✓ Proatividade                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Cores dos Botões em Modo Visualização:**
- Todos os botões aparecem em **VERDE** (#22c55e) com ✓
- Indicam que são competências já selecionadas

---

### 2️⃣ Modo Edição - Antes de Selecionar

```
┌─────────────────────────────────────────────────────────────┐
│                    👤 MEU PERFIL              ✕ CANCELAR    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  COMPETÊNCIAS *                                             │
│  (Mínimo 4 competências)                                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔍 Buscar competência...                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ❌ Selecione no mínimo 4 competências                      │
│                                                              │
│  Competências selecionadas (0)                              │
│  Nenhuma competência selecionada ainda                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ❌ Adicione no mínimo 4 competências para           │   │
│  │    completar seu perfil                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Estado Inicial:**
- Campo de busca vazio
- Nenhuma competência selecionada
- Mensagem de erro vermelha
- Botão "Salvar" desabilitado

---

### 3️⃣ Modo Edição - Digitando na Busca

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Buscar competência...                                   │
│  [lider]                                                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Liderança                                           │   │
│  │ Capacidade de liderança                             │   │
│  │ Perfil influenciador                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Sugestões de Autocomplete:**
- Aparecem em **CINZA/AZUL** (cor padrão)
- Sem ícone ✓ (ainda não selecionadas)
- Clicáveis para adicionar

---

### 4️⃣ Modo Edição - Após Clicar em "Liderança"

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Buscar competência...                                   │
│  []                                                         │
│                                                              │
│  Competências selecionadas (1)                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✓ Liderança                                      ×   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ⚠️ Adicione mais 3 competência(s)                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Após Seleção:**
- Botão **VERDE** (#22c55e) com ✓ aparece
- Campo de busca limpa automaticamente
- Contador atualizado: (1)
- Mensagem de aviso em laranja

---

### 5️⃣ Modo Edição - Adicionando Mais Competências

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Buscar competência...                                   │
│  [com]                                                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Comunicação                                         │   │
│  │ Comunicação verbal                                  │   │
│  │ Comunicação escrita                                 │   │
│  │ Boa comunicação                                     │   │
│  │ Comunicação assertiva                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Competências selecionadas (1)                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✓ Liderança                                      ×   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 6️⃣ Modo Edição - Com 4 Competências (Pronto para Salvar)

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Buscar competência...                                   │
│  []                                                         │
│                                                              │
│  Competências selecionadas (4)                              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ✓ Liderança                                      ×   │  │
│  │ ✓ Comunicação                                    ×   │  │
│  │ ✓ Trabalho em Equipe                             ×   │  │
│  │ ✓ Proatividade                                   ×   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ✅ Você tem competências suficientes para salvar   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [✓ Salvar Perfil]  [Cancelar]                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Estado Completo:**
- 4+ competências selecionadas
- Todos os botões em **VERDE** (#22c55e)
- Mensagem de sucesso em verde
- Botão "Salvar" habilitado (verde)

---

## 🎨 Paleta de Cores

| Elemento | Cor | Código | Uso |
|----------|-----|--------|-----|
| Competência Selecionada | Verde | #22c55e | Botões com ✓ |
| Fundo Selecionado | Verde Claro | #dcfce7 | Hover nos botões |
| Input Focus | Azul | #3b82f6 | Borda do campo de busca |
| Sugestão | Cinza | #6b7280 | Texto das sugestões |
| Erro | Vermelho | #ef4444 | Mensagens de validação |
| Aviso | Laranja | #f97316 | Mensagens de alerta |
| Sucesso | Verde Escuro | #16a34a | Mensagem final |

---

## 📱 Responsividade

### Desktop (1024px+)
```
┌──────────────────────────────────────────────────┐
│ Competências selecionadas (4)                    │
│                                                   │
│ ✓ Liderança ×  ✓ Comunicação ×                   │
│ ✓ Trabalho em Equipe ×  ✓ Proatividade ×        │
└──────────────────────────────────────────────────┘
```

### Tablet (768px)
```
┌────────────────────────────────────┐
│ Competências selecionadas (4)      │
│                                     │
│ ✓ Liderança ×  ✓ Comunicação ×    │
│ ✓ Trabalho em Equipe ×             │
│ ✓ Proatividade ×                   │
└────────────────────────────────────┘
```

### Mobile (320px)
```
┌──────────────────────┐
│ Competências (4)     │
│                      │
│ ✓ Liderança ×       │
│ ✓ Comunicação ×     │
│ ✓ Trabalho em       │
│   Equipe ×          │
│ ✓ Proatividade ×    │
└──────────────────────┘
```

---

## ✨ Animações e Interações

### Ao Adicionar Competência
```
1. Usuário clica em "Comunicação" na sugestão
2. Campo de busca limpa (fade out)
3. Botão VERDE aparece com animação (scale in)
4. Contador atualiza
5. Sugestões desaparecem
```

### Ao Remover Competência
```
1. Usuário clica em × no botão verde
2. Botão desaparece com animação (fade out)
3. Contador atualiza
4. Mensagem de validação atualiza
```

### Ao Fazer Hover
```
- Botões verdes: Sombra aumenta, cor fica mais escura
- Sugestões: Fundo azul claro (#eff6ff)
- Botão ×: Escala aumenta (1.25x)
```

---

## 🎯 Fluxo de Validação

```
┌─────────────────────────────────────────────────┐
│  Usuário clica "Salvar Perfil"                  │
└─────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │ Competências >= 4?            │
        └───────────────────────────────┘
                    │           │
                   SIM         NÃO
                    │           │
                    ▼           ▼
            ┌─────────────┐  ┌──────────────────┐
            │ Salvar      │  │ Mostrar erro:    │
            │ Perfil      │  │ "Adicione no     │
            │             │  │ mínimo 4..."     │
            │ ✅ Sucesso  │  │ ❌ Bloqueado     │
            └─────────────┘  └──────────────────┘
```

---

## 📋 Checklist de Implementação

- ✅ Botões verdes apenas quando selecionados
- ✅ Sugestões com cores variadas
- ✅ Autocomplete inteligente
- ✅ Validação de mínimo 4 competências
- ✅ Mensagens de erro/sucesso visuais
- ✅ Responsivo para mobile/tablet/desktop
- ✅ Animações suaves
- ✅ Acessibilidade (labels, hints)
- ✅ Paleta de cores da plataforma

---

**Versão**: 1.0.0  
**Data**: 11 de Maio de 2026  
**Status**: ✅ Pronto para Produção
