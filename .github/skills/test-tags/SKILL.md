---
name: test-tags
description: Gerar e executar testes de regressão do autocomplete de tags. Use quando precisar proteger interações do campo de tags da página Upload.
disable-model-invocation: true
---
# Testar o autocomplete de tags

Execute os comandos a partir da raiz do repositório.
Examine [TagAutocomplete](../../../src/components/upload/TagAutocomplete.tsx)
e o [setup de testes](../../../tests/setup.ts).

Use os casos descritos abaixo como requisitos, não deduza o resultado
correto apenas da implementação atual. Com Vitest, React Testing Library
e userEvent, crie testes em tests/tag-autocomplete.test.tsx.
Use uma lista local de tags e um wrapper controlado. Consulte elementos
por papel e nome acessível quando aplicável; teste resultados observáveis,
sem depender dos nomes de hooks ou funções privadas.

Não copie nem altere tests/solution e não adicione dependências.
Execute npm test -- --run tests/tag-autocomplete.test.tsx.
Se falhar, diferencie erro do teste de defeito no componente.
Não enfraqueça a asserção para reproduzir o comportamento defeituoso.

## Casos e resultados esperados
Use a lista local ["portrait", "wedding", "wildlife"].

1. Digite "portrait, WI". A opção "wildlife" deve aparecer.
   Clique nela e confira valor "portrait, wildlife" e lista fechada.
2. Digite "w" e confira que há sugestões. Continue digitando "zzz".
   Confira valor "wzzz", ausência de opções e lista fechada.