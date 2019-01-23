setwd("/home/richel/GitHubs/roweb2/themes/ropensci/static/img/blog-images/2019-01-06-babette")
# Create alignment
alignment_text <- c(
  ">1",
  "AAAA",
  ">2",
  "AACC",
  ">3",
  "AACT"
)

fasta_filename <- "alignment.fasta"
writeLines(text = alignment_text, con = fasta_filename)

png(filename = "alignment.png")

ape::image.DNAbin(ape::read.FASTA(
  file = fasta_filename),
  grid = TRUE,
  show.bases = TRUE,
  legend = FALSE
)
dev.off()

file.remove("beast2.xml")
beautier::create_beast2_input_file(
  input_filename = fasta_filename,
  output_filename = "beast2.xml",
  mcmc = create_mcmc(chain_length = 1000000),
  mrca_prior = create_mrca_prior(
    alignment_id = get_alignment_id(fasta_filename = fasta_filename),
    taxa_names = get_taxa_names(filename = fasta_filename),
    mrca_distr = create_normal_distr(mean = 10.0, sigma = 0.01),
    is_monophyletic = TRUE
  )
)

beastier::run_beast2(
  input_filename = "beast2.xml",
  output_trees_filenames = "posterior.trees",
  overwrite = TRUE
)

posterior_trees <- tracerer::parse_beast_trees("posterior.trees")

class(posterior_trees)

babette::plot_densitree(posterior_trees)
plot <- ggtree::ggtree(posterior_trees[901:1001], layout = "slanted", alpha = 0.1) +
  ggtree::geom_tiplab() +
  ggtree::geom_treescale()
plot
plot + ggtree::ggsave("phylogenies.png")


# Create posterior
posterior <- babette::bbt_run(
  fasta_filename = fasta_filename,
  mcmc = create_mcmc(chain_length = 1000000),
  mrca_prior = create_mrca_prior(
    alignment_id = get_alignment_id(fasta_filename = fasta_filename),
    taxa_names = get_taxa_names(filename = fasta_filename),
    mrca_distr = create_normal_distr(mean = 10.0, sigma = 0.01)
  )
)

ggtree::ggtree(posterior[[1]][900:1001], layout = "slanted", alpha = 0.1) +
  ggtree::geom_tiplab() +
  ggtree::geom_treescale() + ggtree::ggsave("phylogenies.png")
