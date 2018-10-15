<!DOCTYPE html>
<html>
<head>
    {{ partial "head.html" (dict "context" . "Title" "rOpenSci Community page" "Description" "Find how to get involved!" "Params.twitterImg" "img/community-scroll/c6.jpg")}}
    {{ partial "style-path.html" }}
</head>
<body>
{{ partial "header.html" . }}


<!-- begins community section -->
    <section>
        <div class="container">
          <div class="row center">
                <div class="col-10 top-20">
                    <h2>Our community is our best asset</h2>
                </div>
            </div>
            <div class="row">
            </div>

            <div class="row">

                <div class="col-8 col-offset-2 top-4">
                    <ul>

                        <li><p>We are building a welcoming and diverse global community of software users and developers from a range of research domains. We aim to build capacity of novices, experts, and the “nexperts” in between. We welcome participation and civil conversations that adhere to our <a href="/coc">code of conduct</a>. There are many ways to get involved.</p></li>

                        <br><br>


                        <li><p><strong>Follow</strong> us on <a href="https://twitter.com/ropensci" target="_blank">Twitter</a>. <strong>Read</strong> <a href="/blog/">our blog </a> to learn about our software packages, best practices, events and the people who make up our community, or read our <a href="https://ropensci.github.io/dev_guide/contributingguide.html">Contributing Guide</a> to learn how you can contribute to rOpenSci as a user or developer. <strong>Subscribe</strong> to<a href="/#subscribe"> rOpenSci News</a> to get <a href="https://news.ropensci.org/" target="_blank">semi-monthly updates</a> on our activities sent to your inbox.</p></li>

                        <br><br>


                        <li><p><strong>Ask and answer</strong> #rstats questions on our<a href="http://discuss.ropensci.org/" target="_blank"> discussion forum</a>, on<a href="https://stackoverflow.com/questions/tagged/ropensci" target="_blank"> Stackoverflow</a>, or<a href="https://twitter.com/rOpenSci" target="_blank"> Twitter</a>. <strong>Attend</strong> our quarterly<a href="http://communitycalls.ropensci.org/" target="_blank"> Community Calls</a> to hear about best practices, Q & As with well known developers, and to learn more about rOpenSci developments. These are free and open for anyone to attend and provide an opportunity to connect with rOpenSci community members around the world.</p></li>

                        <br><br>

                        <li><p><strong>Use</strong><a href="/packages/"> our software</a>. <strong>Improve</strong> package<a href="https://github.com/ropensci" target="_blank"> documentation or code</a>. <strong>Review</strong><a href="http://onboarding.ropensci.org/#why-review" target="_blank"> a package</a>. <strong>Submit</strong> your package for <a href="http://onboarding.ropensci.org/" target="_blank"> open peer review</a> and onboarding. <strong>Apply</strong> to participate in our<a href="http://unconf18.ropensci.org/" target="_blank"> annual unconference</a>.</p></li>
                    </ul>

                    <br><br>
                </div>
            </div>
        </div>
    </section>
    <!-- ends community section -->

{{ partial "community-fancy.html" . }}
{{ partial "mailkimp.html" . }}
{{ partial "footer.html" . }}
</body>
</html>