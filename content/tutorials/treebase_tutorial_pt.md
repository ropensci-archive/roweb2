---
title: treebase tutorial
package_version: 0.0-7.1
---



Neste post vamos ilustrar a fucionalidade do pacote com alguns exemplos introdutórios. Graças em parte às novas normas de periódicos como Evolution, Am Nat, e Sys Bio que requerem que os dados sejam depositados e
planos de gerenciamento de dados requeridos pela NSF, esperamos que o pacote seja bastante útil para ensino na medida que replica os resultados ou para meta-análises que podem ser atualizadas automaticamente à medida que o repositório cresça. Informações adicionais e reletórios de erro são bem-invos via [treebase page](http://ropensci.org/packages/treebase.html#support).


<section id="installation">

## Instalação



```r
install.packages('treebase')
```


```r
library(treebase)
```

<section id="usage">

## Usoe

Busca básica de dados e árvores
==========

Baixando árvores usando diferentes termos: por autor, taxa, & estudo. Mais opções são descritas no arquivo de ajuda.


```r
both <- search_treebase("Ronquist or Hulesenbeck", by=c("author", "author"))
dolphins <- search_treebase('"Delphinus"', by="taxon", max_trees=5)
studies <- search_treebase("2377", by="id.study")
```


```r
Near <- search_treebase("Near", "author", branch_lengths=TRUE, max_trees=3)
Near[1]
```

```
[[1]]

Phylogenetic tree with 188 tips and 186 internal nodes.

Tip labels:
	Beryx_decadactylus, Brotula_multibarbata, Odontobutis_potamophila, Percottus_glenni, Eleotris_pisonis, Cheilodipterus_quinquelineatus, ...

Unrooted; includes branch lengths.
```

Podemos fazer uma busca pelos metadados diretamente. Por exemplo, fazer um gráfico do cresciento de submissões para o Treebase em função da data da publicação


```r
all <- download_metadata("", by="all")
dates <- sapply(all, function(x) as.numeric(x$date))
library(ggplot2)
qplot(dates, main="Treebase growth", xlab="Year", binwidth=.5)
```

(A busca anterior também aceita um conjunto de datas)

Como qual é ritmo de submissões semanais para o Treebase? Construímos isso de forma que nos retornará os índices dos emparelhamentos, para que possamos pegar as árvores diretamente. Rode os scripts você mesmo para ver se eles mudaram!


```r
nature <- sapply(all, function(x) length(grep("Nature", x$publisher))>0)
science <- sapply(all, function(x) length(grep("^Science$", x$publisher))>0)
sum(nature)
sum(science)
```

Replicando resultados
-------------------

Um artigo legal de Derryberry et al. sobre [diversification in ovenbirds and woodcreepers, 0.1111/j.1558-5646.2011.01374.x](http://www.museum.lsu.edu/brumfield/pubs/furnphylogeny2011.pdf) apareceu recentemente na Evolution. O artigo menciona que a árvore está no Treebase, então vejamos se podemos replicar os resultados das análises de taxas de diversificação: Vamos pegar as árvores daqueles autores e conferir se temos as corretas:


```r
search_treebase("Derryberry", "author")[[1]] -> tree
plot(tree)
```

![plot of chunk unnamed-chunk-3](../assets/tutorial-images/treebase/unnamed-chunk-3-1.png)

Eles ajustaram vários modelos de taxas de diversificação disponíveis no pacote do R `laser`, e então os compararam com AIC.


```r
install.packages("laser")
```


```r
library(laser)
tt <- branching.times(tree)
models <-  list(pb = pureBirth(tt),
                bdfit = bd(tt),
                y2r = yule2rate(tt), # yule model with single shift pt
                ddl = DDL(tt), # linear, diversity-dependent
                ddx = DDX(tt), #exponential diversity-dendent
                sv = fitSPVAR(tt), # vary speciation in time
                ev = fitEXVAR(tt), # vary extinction in time
                bv = fitBOTHVAR(tt)# vary both
                )
names(models[[3]])[5] <- "aic"
aics <- sapply(models, "[[", "aic")
# show the winning model
models[which.min(aics)]
```

```
$y2r
         LH          r1          r2         st1         aic
 229.266990   18.316271    4.075395    0.010060 -452.533980
```

Opa! Os resultados deles concordam com as nossas análises. Ussando a grande gama de ferramenteas para analisar taxas de diversificação no R , poderíamos agora facilmente verificar se estes resultados se mantêm os mesmo quando usamos novos métodos disponívels no TreePar, etc.

Meta-Analise
-------------

Claro, um dos mais interessantes desafios em se ter uma interface automatizada é a possilidade de realizar meta-análises que utilizam as filogenias disponíveis no treebase. Como uma simples prova de princípios, vamos verificar todas as filogenias no treebase para ver se elas se ajustam melhor a um modelo de nascimento-morte ou Yule.

Criaremos duas funções simples para nos ajudar nesta análise. Enquanto essas foram fornecidas no pacote treebase, inclui-las aqui para ilustrar a flexibilidade de uma função construída (Elas são essencialmente ilustrativas; Usuários e desenvolvedores devem criar suas próprias. Numa análise mais aproprida verificaríamos alguns pontos.)


```r
timetree <- function(tree){
    check.na <- try(sum(is.na(tree$edge.length))>0)
    if(is(check.na, "try-error") | check.na)
      NULL
    else
    try( chronoMPL(multi2di(tree)) )
}
drop_errors <- function(tr){
  tt <- tr[!sapply(tr, is.null)]
  tt <- tt[!sapply(tt, function(x) is(x, "try-error"))]
  print(paste("dropped", length(tr)-length(tt), "trees"))
  tt
}
require(laser)
pick_branching_model <- function(tree){
  m1 <- try(pureBirth(branching.times(tree)))
  m2 <- try(bd(branching.times(tree)))
  as.logical(try(m2$aic < m1$aic))
}
```

Returna somente as árvores do treebase que contêm comprimentos de ramo. Este passo baixa todas as árvores do treebase, então pode demorar um pouco. Ainda bem que não temos de fazer isso manualmente :) .


```r
all <- search_treebase("Consensus", "type.tree", branch_lengths=TRUE)
tt <- drop_errors(sapply(all, timetree))
is_yule <- sapply(tt, pick_branching_model)
table(is_yule)
```

_Note que o resultado não é mostrado, mas roda no fundo!_

<section id="citing">

## Citação

Para citar o `treebase` numa publicação, use:

<br>

> Carl Boettiger and Duncan Temple Lang (2011). treebase: An R package for discovery, access and manipulation of online phylogenies. R package version 0.0-7.1. https://github.com/ropensci/treebase

<section id="license_bugs">

## Licença e erros

* Licença: [CC0](http://creativecommons.org/choose/zero/)
* Relatório de error em [our Github repo for treebase](https://github.com/ropensci/treebase/issues?state=open)

[Back to top](#top)
