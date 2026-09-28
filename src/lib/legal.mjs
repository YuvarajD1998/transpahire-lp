/**
 * legal.mjs — the document layout the legal pages share.
 *
 * PHASE 3 SHIPPED THESE AS PENDING NOTICES, and the reasoning was sound: a
 * template privacy policy on a site like this is worse than an empty page,
 * because it reads as a commitment, it will be relied on, and it describes a
 * product it was not written for.
 *
 * PHASE 4 REPLACES THEM WITH REAL DRAFTS, on a different reading of the same
 * problem. What has been blocking counsel is not the legal work; it is the
 * FACTUAL half — exactly what data the product holds, what it infers, who can
 * see it, and what a user can ask for. A lawyer can draft against that in an
 * afternoon. A lawyer staring at a blank page and a product they have not used
 * cannot.
 *
 * So these are complete drafts with the product facts filled in and every legal
 * determination flagged `[COUNSEL]`. The standing caveat, which is not
 * negotiable and is printed at the top of every one of them:
 *
 *     NOTHING IN THIS STREAM IS LEGAL ADVICE, AND NONE OF IT SHOULD GO LIVE
 *     WITHOUT A NAMED LAWYER'S SIGN-OFF.
 *
 * All three keep `data-content="provisional"`, and the site stays `noindex`
 * until sign-off regardless — so the drafts are reachable by somebody who was
 * sent the link and are not published to the world.
 *
 * `counsel()` renders a flag. Every one of them is a decision somebody with a
 * practising certificate has to make, and they are deliberately loud: a
 * `[COUNSEL]` marker that is easy to miss is a `[COUNSEL]` marker that ships.
 */

import { esc } from './compositions.mjs';
import { pageHead } from './page.mjs';

/** The date this draft's product facts were read out of the source. */
export const FACTS_AS_OF = '31 August 2026';

/**
 * A legal determination this document cannot make. Rendered inline, visibly, in
 * the flow of the sentence it belongs to.
 */
export function counsel(text) {
  return `<span class="counsel"><span class="counsel__tag">Counsel</span>${esc(text)}</span>`;
}

/** A document section, with an id so the contents list can reach it. */
export function docSection({ n, id, title, body }) {
  return `      <section class="doc__section" id="${id}" data-reveal="up">
        <h2 class="doc__h2"><span class="doc__n">${n}</span> ${title}</h2>
${body}
      </section>`;
}

/**
 * The document shell: the standing caveat, an anchored table of contents, the
 * sections, and a last-reviewed line.
 *
 * The contents list is generated from the sections rather than hand-maintained,
 * because a table of contents that has drifted from its document is worse than
 * none — and in a legal document it is the kind of error that gets noticed by
 * exactly the wrong reader.
 */
export function legalDoc({ eyebrow, title, lede, sections, intro = '', chooser = '' }) {
  return `${pageHead({
    crumb: 'Legal',
    crumbHref: '/legal/',
    eyebrow,
    title,
    lede,
  })}

<section class="section section--tight-top" data-content="provisional">
  <div class="container container--text">

    <div class="pending" data-reveal="up">
      <p class="pending__label">Draft — not yet reviewed by counsel</p>
      <p class="body-copy body-copy--lg">
        This is a complete draft with the product facts filled in and every legal determination
        flagged. It has not been reviewed by a lawyer, it is not legal advice, and nothing in it
        should be relied on until it has been signed off and this notice is gone.
      </p>
      <p class="body-copy">
        It is published in draft rather than withheld because the factual half — what the
        platform holds, what it computes, who can see it and what you can ask for — is
        checkable today, and a candidate asking those questions deserves an answer that exists.
        Product facts read from the source on ${FACTS_AS_OF}.
      </p>
    </div>

${chooser}

${intro}

    <nav class="doc__toc" aria-labelledby="toc-label" data-reveal="up">
      <h2 class="doc__toclabel" id="toc-label">Contents</h2>
      <ol class="doc__toclist">
${sections.map((s) => `        <li><a href="#${s.id}"><span class="doc__n">${s.n}</span> ${s.title.replace(/<[^>]+>/g, '')}</a></li>`).join('\n')}
      </ol>
    </nav>

    <div class="doc">
${sections.map(docSection).join('\n\n')}
    </div>

    <p class="doc__foot" data-reveal="up">
      Draft. Last updated ${FACTS_AS_OF}. When this document is signed off, this line becomes a
      version and a date, and every subsequent change gets its own.
    </p>

  </div>
</section>`;
}

/**
 * The two-audience chooser. Most privacy policies in this category fail
 * candidates by writing entirely for the buyer, so the two audiences are named
 * at the top and the document is ordered candidate-first.
 */
export function audienceChooser({ candidateHref, orgHref, note = '' }) {
  return `    <div class="chooser" data-reveal="up">
      <a class="chooser__opt" href="${candidateHref}">
        <span class="chooser__who">I&rsquo;m a candidate</span>
        <span class="chooser__note">What is held about you, what is computed, and what you can ask for.</span>
      </a>
      <a class="chooser__opt" href="${orgHref}">
        <span class="chooser__who">I&rsquo;m a hiring organisation</span>
        <span class="chooser__note">What you may do with candidate data, and where responsibility for a hiring decision sits.</span>
      </a>
${note ? `      <p class="chooser__foot">${note}</p>` : ''}
    </div>`;
}
