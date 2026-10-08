export interface AffiliateProduct {
  name: string
  description: string
  link: string
  badge?: string
}

export interface Resource {
  slug: string
  title: string
  metaTitle: string
  description: string
  intro: string
  sections: { heading: string; content: string }[]
  affiliates?: AffiliateProduct[]
  cta: string
}

export const resources: Resource[] = [
  {
    slug: 'how-to-file-taxes-canada-newcomer',
    title: 'How to File Taxes in Canada as a Newcomer',
    metaTitle: 'How to File Taxes in Canada as a Newcomer — Complete Guide | TaxNorth',
    description: 'Step-by-step guide for newcomers on how to file taxes in Canada. Learn what documents you need, deadlines, free filing options, and how to maximize your refund.',
    intro: 'Filing taxes in Canada for the first time can feel overwhelming. But for most newcomers, the process is simpler than it looks — and it almost always results in money coming back to you, not going out.',
    sections: [
      {
        heading: 'Step 1 — Determine your residency status',
        content: 'For tax purposes, you become a Canadian resident on the date you establish significant ties to Canada — usually the day you arrived with the intention to stay. You only report income earned after that date for your first year. International students and work permit holders are generally considered Canadian residents for tax purposes.'
      },
      {
        heading: 'Step 2 — Gather your documents',
        content: 'You will need your Social Insurance Number (SIN), your T4 slip from every employer you worked for (issued by the last day of February), your date of arrival in Canada, and your Notice of Assessment from the previous year if you have one. Keep all receipts for medical expenses, moving costs, and childcare if applicable.'
      },
      {
        heading: 'Step 3 — Choose how to file',
        content: 'Most newcomers file using NETFILE — the CRA online filing system. You use certified tax software to complete your return and submit it electronically. The CRA maintains a list of free certified software at canada.ca/netfile-software. For newcomers with simple situations, the Community Volunteer Income Tax Program (CVITP) offers free in-person help at locations across Canada. For complex situations — self-employment, multiple income sources, or unfiled previous years — a licensed tax professional is the recommended option.'
      },
      {
        heading: 'Step 4 — File by the deadline',
        content: 'The filing deadline for most individuals is April 30. If you or your spouse are self-employed, the deadline to file is June 15, but any taxes owing must still be paid by April 30. Even if you have no income to report, filing is important — it activates your Canada Groceries and Essentials Benefit, Canada Workers Benefit, and other benefits you are entitled to receive.'
      },
      {
        heading: 'Step 5 — Set up direct deposit',
        content: 'After filing, set up direct deposit through My CRA Account at canada.ca. This ensures your refund and benefit payments arrive in your bank account within 5 to 10 business days instead of waiting weeks for a cheque.'
      },
      {
        heading: 'What happens after you file',
        content: 'The CRA processes your return and sends you a Notice of Assessment confirming the results. If you are owed a refund, it arrives within 2 weeks when you file electronically with direct deposit. If you owe taxes, pay by April 30 to avoid interest charges. The CRA will also automatically begin issuing any credits and benefits you qualify for.'
      }
    ],
    cta: 'Have questions about filing your first Canadian tax return? Ask TaxNorth — free, in any language.'
  },
  {
    slug: 'what-is-a-t4-slip-canada',
    title: 'What is a T4 Slip? A Guide for Newcomers to Canada',
    metaTitle: 'What is a T4 Slip in Canada? Explained for Newcomers | TaxNorth',
    description: 'Learn what a T4 slip is, what every box means, when you receive it, and how to use it to file your Canadian tax return. Clear guide for newcomers.',
    intro: 'If you worked in Canada this year, you will receive a T4 slip from your employer. It is one of the most important documents you need to file your taxes — and understanding what each box means makes the whole process much easier.',
    sections: [
      {
        heading: 'What is a T4 slip?',
        content: 'A T4 slip — officially called a Statement of Remuneration Paid — is a document your employer must provide to you and to the Canada Revenue Agency (CRA). It summarizes your total employment income for the year and all the amounts deducted from your pay. If you worked for more than one employer, you will receive a T4 from each one.'
      },
      {
        heading: 'When do you receive your T4?',
        content: 'Your employer must issue your T4 by the last day of February for the previous tax year. So for income earned in 2025, you receive your T4 by February 28, 2026. If you have not received it by then, contact your employer first. If they cannot provide it, you can request a copy through My Account on the CRA website.'
      },
      {
        heading: 'The most important boxes on your T4',
        content: 'Box 14 shows your total employment income — the full amount you earned before any deductions. Box 22 shows income tax deducted — the amount your employer withheld for taxes throughout the year. Box 16 shows your CPP contributions to the Canada Pension Plan. Box 18 shows your EI premiums paid toward Employment Insurance. Box 24 shows your EI insurable earnings. Box 26 shows your CPP pensionable earnings.'
      },
      {
        heading: 'How to use your T4 to file taxes',
        content: 'When you file your tax return, you enter the information from your T4 into your tax software or form. The amounts in Box 22 represent tax already paid — if more was withheld than you owe, you receive a refund. If less was withheld, you pay the difference. Most newcomers with a single T4 and no other income receive a refund because they also qualify for credits like the Canada Groceries and Essentials Benefit and the basic personal amount.'
      },
      {
        heading: 'What if you lost your T4?',
        content: 'Contact your employer to request a replacement. Most employers can resend it electronically. You can also log into My Account at canada.ca — if your employer submitted the T4 to the CRA electronically, a copy is available there. Never file your tax return without including all your T4 slips.'
      }
    ],
    cta: 'Still have questions about your T4 or how to file? Ask TaxNorth — free, clear answers in any language.'
  },
  {
    slug: 'gst-hst-credit-canada-newcomers',
    title: 'The Canada Groceries and Essentials Benefit: What Newcomers Need to Know',
    metaTitle: 'Canada Groceries and Essentials Benefit for Newcomers 2026 | TaxNorth',
    description: 'The GST/HST credit was replaced by the Canada Groceries and Essentials Benefit in July 2026 — paying 25% more. Learn who qualifies and how to get it as a newcomer.',
    intro: 'In July 2026, Canada replaced the GST/HST credit with the Canada Groceries and Essentials Benefit — and the new benefit pays 25% more. Most newcomers have no idea this money exists. Here is everything you need to know to claim it.',
    sections: [
      {
        heading: 'What is the Canada Groceries and Essentials Benefit?',
        content: 'The Canada Groceries and Essentials Benefit (CGEB) is a tax-free quarterly payment from the federal government to help Canadians with low and modest incomes. It replaced the GST/HST credit in July 2026 and pays 25% more than its predecessor. It is not charity — it is a benefit you are entitled to as a Canadian resident, funded by taxes already collected from everyone.'
      },
      {
        heading: 'How much can you receive?',
        content: 'For 2026, a single individual with no children and modest income can receive approximately $650 per year. Families with children receive more. The lower your income, the higher the benefit. Payments arrive quarterly — in October, January, April, and July.'
      },
      {
        heading: 'The one thing you need to do to receive it',
        content: 'File your tax return. That is it. You do not fill out a separate form. You do not call anyone. The CRA automatically calculates your entitlement when you file, even if you had zero income that year. Every year you do not file is a year you decline this money.'
      },
      {
        heading: 'Can you get it in your first year in Canada?',
        content: 'Yes. If you became a Canadian resident during the year and file a return, you may be eligible for a prorated amount in your first benefit year. You can also apply early using Form RC151 before filing your first return — this lets you start receiving payments sooner without waiting until tax season.'
      },
      {
        heading: 'What about the old GST/HST credit?',
        content: 'If you arrived before July 2026 and received the GST/HST credit, the transition was automatic. The CRA switched existing recipients to the new benefit without any action required. The amount simply increased by approximately 25% starting with the July 2026 payment.'
      }
    ],
    cta: 'Not sure if you qualify or how much you can receive? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'tax-filing-deadline-canada',
    title: 'Canadian Tax Filing Deadlines: Everything Newcomers Need to Know',
    metaTitle: 'Tax Filing Deadline Canada 2025-2026: Guide for Newcomers | TaxNorth',
    description: 'Learn the tax filing deadlines in Canada, what happens if you miss them, and why filing on time — even with no income — is critical for newcomers.',
    intro: 'Missing the tax filing deadline in Canada has real consequences — both financial penalties and lost benefits. Here is everything you need to know about when to file, what happens if you are late, and why filing early is almost always the right move.',
    sections: [
      {
        heading: 'The main filing deadline — April 30',
        content: 'For most individuals in Canada, the deadline to file your income tax return is April 30 of the year following the tax year. For example, your 2025 tax return must be filed by April 30, 2026. If April 30 falls on a weekend or holiday, the deadline moves to the next business day.'
      },
      {
        heading: 'Self-employed individuals — June 15',
        content: 'If you or your spouse or common-law partner are self-employed, the deadline to file your tax return is June 15. However — and this is critical — any taxes you owe must still be paid by April 30. Filing by June 15 but owing taxes means interest starts accumulating from May 1, even though you filed on time.'
      },
      {
        heading: 'What happens if you file late?',
        content: 'If you owe taxes and file late, the CRA charges a late-filing penalty of 5 percent of the balance owed, plus 1 percent for each full month your return is late, up to a maximum of 12 months. If you have filed late before, the penalty increases. Interest also compounds daily on any unpaid amount from May 1 onward.'
      },
      {
        heading: 'What if you cannot pay what you owe?',
        content: 'If you cannot pay the full amount by April 30, file your return on time anyway to avoid the late-filing penalty. Then contact the CRA at 1-888-863-8657 to arrange a payment plan. The CRA works with taxpayers who reach out proactively. The worst thing to do is not file at all.'
      },
      {
        heading: 'Why newcomers should file even with no income',
        content: 'Many newcomers assume that if they had no income, they do not need to file. This is incorrect — and costly. Filing your return, even with zero income, activates your Canada Groceries and Essentials Benefit, Canada Workers Benefit, Canada Child Benefit if you have children, and provincial benefits like the Ontario Trillium Benefit. Every year you do not file is a year you decline those payments.'
      }
    ],
    cta: 'Questions about deadlines or what to file? Ask TaxNorth — free, instant answers in your language.'
  },
  {
    slug: 'international-student-taxes-canada',
    title: 'How International Students File Taxes in Canada',
    metaTitle: 'International Student Taxes Canada: Complete Filing Guide | TaxNorth',
    description: 'Everything international students need to know about filing taxes in Canada — residency status, tuition credits, T4 slips, benefit eligibility, and free filing options.',
    intro: 'If you are an international student in Canada, you likely need to file a Canadian tax return — and doing so can put money back in your pocket through the tuition tax credit and the Canada Groceries and Essentials Benefit. Here is everything you need to know.',
    sections: [
      {
        heading: 'Are international students required to file taxes in Canada?',
        content: 'If you lived in Canada for more than 183 days in a calendar year, you are generally considered a Canadian resident for tax purposes and should file a tax return. This applies to most international students. Even if you had no income, filing is worthwhile because it makes you eligible for the Canada Groceries and Essentials Benefit and builds your RRSP contribution room for future years.'
      },
      {
        heading: 'The tuition tax credit',
        content: 'As an international student paying tuition to a Canadian post-secondary institution, you can claim the tuition tax credit. Your school provides a T2202 form each year showing your eligible tuition fees. This credit directly reduces the amount of federal tax you owe. If the credit exceeds your tax owing, you can carry the unused amount forward to future years or transfer up to $5,000 to a parent, grandparent, or spouse who is a Canadian resident.'
      },
      {
        heading: 'Working while studying — T4 slips',
        content: 'If you worked part-time or full-time while studying in Canada, your employer issues a T4 slip by the end of February showing your income and deductions. You must include this income in your tax return. Many students who worked throughout the year receive a refund because their employer withheld more tax than necessary.'
      },
      {
        heading: 'Benefits international students can access',
        content: 'International students who are Canadian residents for tax purposes are eligible for the Canada Groceries and Essentials Benefit. Even if you had no employment income, filing your return makes you eligible for this quarterly payment. The amount depends on your income — lower income means higher benefit.'
      },
      {
        heading: 'Free tax help for students',
        content: 'The Community Volunteer Income Tax Program (CVITP) offers free tax filing help for students with simple tax situations. Many universities and colleges host CVITP clinics on campus during tax season — typically from February to April. Check your school\'s student services office for dates and locations.'
      }
    ],
    cta: 'Questions about your taxes as an international student? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'work-permit-taxes-canada',
    title: 'Tax Guide for Work Permit Holders in Canada',
    metaTitle: 'Work Permit Taxes Canada: Complete Guide for Foreign Workers | TaxNorth',
    description: 'Everything work permit holders need to know about Canadian taxes — filing requirements, eligible benefits, T4 slips, CPP and EI contributions, and deadlines.',
    intro: 'If you are working in Canada on a work permit, you have the same tax filing obligations as Canadian citizens and permanent residents — and the same rights to benefits and credits. Here is what you need to know.',
    sections: [
      {
        heading: 'Do work permit holders pay Canadian taxes?',
        content: 'Yes. If you are living and working in Canada on a work permit, you are generally considered a Canadian resident for tax purposes. This means you pay Canadian income tax on your worldwide income and must file a Canadian tax return each year. Your employer deducts income tax, CPP contributions, and EI premiums directly from your pay.'
      },
      {
        heading: 'What benefits are you eligible for?',
        content: 'Work permit holders who are Canadian residents for tax purposes are eligible for most federal benefits including the Canada Groceries and Essentials Benefit, Canada Workers Benefit, and Canada Child Benefit if you have children. These benefits are activated by filing your tax return.'
      },
      {
        heading: 'CPP and EI contributions',
        content: 'Your employer automatically deducts Canada Pension Plan (CPP) contributions and Employment Insurance (EI) premiums from each paycheck. You can see these amounts in Box 16 and Box 18 of your T4 slip. Your CPP contributions build toward a future retirement pension — even if you eventually leave Canada, you may be entitled to a CPP pension based on your Canadian contributions.'
      },
      {
        heading: 'What if your work permit expires?',
        content: 'If your work permit expires mid-year, you may become a non-resident for tax purposes on the date you leave Canada. In that case, you file a tax return as a part-year resident, reporting only the income earned while you were a Canadian resident. You may still be owed a refund for tax withheld while you worked.'
      },
      {
        heading: 'Tax treaties and foreign income',
        content: 'If you also earned income in your home country while living in Canada, you generally must report it on your Canadian tax return. However, Canada has tax treaties with many countries to prevent double taxation. A foreign tax credit allows you to offset Canadian taxes with taxes you paid abroad on the same income.'
      }
    ],
    cta: 'Have questions about taxes on your work permit? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'canada-child-benefit-newcomers',
    title: 'Canada Child Benefit for Newcomers: Eligibility and How to Apply',
    metaTitle: 'Canada Child Benefit for Newcomers: Who Qualifies and How to Apply | TaxNorth',
    description: 'Learn who qualifies for the Canada Child Benefit as a newcomer, how much you can receive, when payments arrive, and exactly how to apply.',
    intro: 'The Canada Child Benefit is one of the most valuable programs for newcomer families in Canada. It provides tax-free monthly payments to help with the cost of raising children — and many families qualify for thousands of dollars per year.',
    sections: [
      {
        heading: 'What is the Canada Child Benefit?',
        content: 'The Canada Child Benefit (CCB) is a tax-free monthly payment made to eligible families to help with the cost of raising children under 18 years of age. For the 2025-2026 benefit year, the maximum CCB is $7,997 per year for each child under age 6 and $6,748 per year for each child aged 6 to 17. Unlike older child benefit programs, the CCB is targeted — families with lower incomes receive higher payments. It is not taxable income.'
      },
      {
        heading: 'Who is eligible as a newcomer?',
        content: 'To receive the Canada Child Benefit, you must be a Canadian resident for tax purposes and be primarily responsible for the care and upbringing of a child under 18. For newcomers specifically, you can apply once you have lived in Canada for 18 months and hold a valid permit in the 19th month, or once you become a Canadian citizen or permanent resident. Work permit holders and protected persons are eligible.'
      },
      {
        heading: 'How much can you receive?',
        content: 'The amount depends on your family net income and the ages of your children. For a family with one child under 6 and a family net income below $36,502, the annual benefit is the full $7,997. Payments are recalculated every July based on your previous year\'s tax return. The lower your income, the higher your benefit.'
      },
      {
        heading: 'How to apply',
        content: 'You can apply for the CCB by completing Form RC66 (Canada Child Benefits Application) and mailing it to the CRA, or by applying online through My CRA Account. You must also register the birth of your child with the province or territory — in many provinces, this automatically triggers a CCB application. Filing your tax return each year is essential to continue receiving the benefit.'
      },
      {
        heading: 'When do payments arrive?',
        content: 'Payments are made on the 20th of each month. Set up direct deposit through My CRA Account to receive payments directly. If you are newly approved, your first payment may include retroactive amounts going back to when you became eligible.'
      }
    ],
    cta: 'Questions about the Canada Child Benefit or other benefits for your family? Ask TaxNorth — free, in your language.'
  },
  {
    slug: 'rrsp-for-newcomers-canada',
    title: 'RRSP for Newcomers to Canada: A Complete Guide',
    metaTitle: 'RRSP for Newcomers to Canada: How It Works and When to Start | TaxNorth',
    description: 'Everything newcomers need to know about the Registered Retirement Savings Plan in Canada — contribution room, deadlines, tax benefits, and how to get started.',
    intro: 'The RRSP is one of the most powerful tax tools available to Canadians — and as a newcomer, you start building contribution room from your very first year of Canadian income. Understanding how it works early can save you thousands of dollars over your lifetime.',
    sections: [
      {
        heading: 'What is an RRSP?',
        content: 'A Registered Retirement Savings Plan is a government-registered account that lets you save for retirement while reducing your taxes today. Contributions to your RRSP are tax-deductible, meaning they reduce your taxable income for the year you contribute. The investments inside your RRSP grow tax-free until you withdraw them, typically in retirement when your income is lower.'
      },
      {
        heading: 'How does contribution room work for newcomers?',
        content: 'Your RRSP contribution room is calculated as 18 percent of your previous year\'s earned income, up to the annual maximum limit ($32,490 for 2025, $33,810 for 2026). As a newcomer, you start earning contribution room from the first year you have Canadian income. You do not get credit for income earned outside Canada before you arrived. Unused contribution room carries forward indefinitely — so you can save it for years when you earn more.'
      },
      {
        heading: 'What is the RRSP contribution deadline?',
        content: 'The deadline to contribute to your RRSP for a given tax year is 60 days after December 31 — usually March 1 of the following year. For example, to claim RRSP contributions on your 2025 tax return, you have until March 2, 2026. Contributions made in January or February of the new year can be applied to either the previous year or the current year.'
      },
      {
        heading: 'When should newcomers start contributing?',
        content: 'There is no rush to contribute immediately upon arriving in Canada. In your early years as a newcomer, your income may be lower and your marginal tax rate may be modest. RRSP contributions are most valuable when you are in a high tax bracket because the deduction saves you more. Many financial advisors suggest newcomers focus first on building an emergency fund and a TFSA before prioritizing RRSP contributions.'
      },
      {
        heading: 'RRSP vs. TFSA — which is better for newcomers?',
        content: 'Both are valuable but serve different purposes. The TFSA is often recommended first for newcomers because withdrawals are completely tax-free and flexible — you can take money out at any time without tax consequences. The RRSP is better for high earners who want to reduce their taxable income now and expect to be in a lower bracket in retirement. Many Canadians use both strategically.'
      },
      {
        heading: 'How to check your RRSP contribution room',
        content: 'Your available RRSP contribution room is shown on your Notice of Assessment, which the CRA sends after processing your tax return. You can also check it anytime in My Account at canada.ca. If you over-contribute by more than $2,000 above your limit, you are subject to a penalty tax of 1 percent per month on the excess amount.'
      }
    ],
    cta: 'Have questions about RRSP as a newcomer? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'what-to-do-if-you-owe-taxes-canada',
    title: 'What to Do If You Owe Taxes in Canada',
    metaTitle: 'Owe Taxes in Canada? What Newcomers Should Do | TaxNorth',
    description: 'Owe money to the CRA? Learn your options — payment plans, interest charges, voluntary disclosure, and how to avoid penalties as a newcomer in Canada.',
    intro: 'Getting a tax bill can be stressful, especially if you are new to Canada and unfamiliar with the system. The good news is that the CRA has clear processes for managing what you owe — and the worst thing you can do is ignore it.',
    sections: [
      {
        heading: 'Why do some people owe taxes?',
        content: 'You may owe taxes if your employer did not withhold enough throughout the year, if you have multiple income sources, if you earned self-employment or freelance income, or if you received investment income. Even newcomers with only employment income sometimes owe a small balance due to the timing of their arrival in Canada.'
      },
      {
        heading: 'When does the CRA charge interest and penalties?',
        content: 'If you owe taxes and do not pay by April 30, the CRA charges daily compound interest from May 1 onward. The interest rate changes quarterly and is typically between 8 and 10 percent annually. If you also filed your return late, there is an additional late-filing penalty of 5 percent of the balance owing plus 1 percent for each full month late, up to 12 months.'
      },
      {
        heading: 'What if you cannot afford to pay the full amount?',
        content: 'Always file your return on time even if you cannot pay. Filing late adds a penalty on top of what you already owe. Once you have filed, contact the CRA at 1-888-863-8657 to arrange a payment plan. The CRA works with taxpayers who reach out proactively. They can set up pre-authorized monthly payments from your bank account and will often reduce or waive interest if you demonstrate financial hardship.'
      },
      {
        heading: 'How to make a payment to the CRA',
        content: 'You can pay the CRA through online banking by adding Canada Revenue Agency as a payee and using your Social Insurance Number as the account number. You can also pay in person at any bank branch, by mail with a cheque, or through My Account at canada.ca. When paying online, allow 3 to 5 business days for the payment to be processed before the deadline.'
      },
      {
        heading: 'What is the Voluntary Disclosures Program?',
        content: 'If you have not filed returns from previous years or did not report income, the Voluntary Disclosures Program allows you to come forward and correct your tax affairs before the CRA contacts you. If you qualify, the CRA may waive penalties and reduce interest. This program is especially relevant for newcomers who did not know they were required to file in their first years in Canada. You must apply before the CRA starts an audit or collection action against you.'
      },
      {
        heading: 'Can owing taxes affect your immigration status?',
        content: 'Unpaid taxes generally do not directly affect your immigration status, but they can affect your ability to receive certain benefits and government services. The CRA can also take collection actions including garnishing wages or bank accounts if a debt remains unpaid for an extended period. It is always better to communicate with the CRA and arrange payment rather than ignore the situation.'
      }
    ],
    cta: 'Worried about what you owe the CRA? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'provincial-tax-differences-canada',
    title: 'Provincial Tax Differences in Canada: What Newcomers Need to Know',
    metaTitle: 'Provincial Tax Differences Canada: Guide for Newcomers | TaxNorth',
    description: 'How provincial taxes differ across Canada — tax rates, credits, sales tax, and benefits that vary by province. Helps newcomers choose where to live.',
    intro: 'Canada\'s tax system has two layers — federal and provincial. While federal taxes apply the same way across the country, your province of residence significantly affects how much you pay and what benefits you receive. Here is what newcomers need to know.',
    sections: [
      {
        heading: 'How provincial taxes work',
        content: 'Every province and territory has its own income tax rates and brackets that are applied on top of federal tax. When you file your tax return, you report your income once and the CRA calculates both federal and provincial tax together. You pay provincial tax based on which province you lived in on December 31 of the tax year. If you moved provinces during the year, you pay based on where you were on December 31.'
      },
      {
        heading: 'Alberta — no provincial sales tax',
        content: 'Alberta is the only province with no provincial sales tax. Residents pay only the 5 percent federal GST on purchases. Alberta also has relatively flat provincial income tax rates, making it attractive for workers at most income levels. Calgary and Edmonton are major immigration hubs with large newcomer communities and strong job markets in energy, technology, and services.'
      },
      {
        heading: 'Ontario — highest population, significant credits',
        content: 'Ontario is Canada\'s most populous province and home to the largest newcomer population. Provincial income tax rates are moderate but Ontario offers significant credits including the Ontario Trillium Benefit, which combines energy, property tax, and sales tax credits into monthly payments. Ontario has a 13 percent Harmonized Sales Tax combining federal and provincial sales tax.'
      },
      {
        heading: 'British Columbia — high cost, progressive rates',
        content: 'British Columbia has relatively progressive income tax rates and a combined 12 percent HST. Vancouver is one of the most expensive cities in Canada but also one of the most diverse with large immigrant communities from Asia. BC offers the BC Family Benefit for families with children and the BC Climate Action Tax Credit.'
      },
      {
        heading: 'Quebec — separate tax return required',
        content: 'Quebec is unique in Canada because residents file two separate tax returns — one federal and one provincial — to Revenu Québec. Quebec has its own Quebec Pension Plan instead of CPP. Provincial income tax rates in Quebec are higher than most provinces but Quebec also offers significantly more subsidized services including very low-cost childcare. Quebec residents receive communications and services in French.'
      },
      {
        heading: 'Which province is best for newcomers financially?',
        content: 'There is no single answer — it depends on your income level, family situation, and priorities. Alberta is often best for workers without children due to low taxes and no provincial sales tax. Quebec can be best for families with children due to subsidized childcare. Ontario offers the most job opportunities in finance, technology, and government. British Columbia attracts many from Asia-Pacific countries due to established communities. Consider the total picture including housing costs, job market, and community when choosing where to settle.'
      }
    ],
    cta: 'Questions about taxes in your province? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'reading-your-notice-of-assessment-canada',
    title: 'How to Read Your Notice of Assessment from the CRA',
    metaTitle: 'Notice of Assessment Canada: How to Read It as a Newcomer | TaxNorth',
    description: 'Learn what every section of your CRA Notice of Assessment means, what to check, and what to do if something looks wrong.',
    intro: 'After you file your tax return, the CRA sends you a Notice of Assessment. For many newcomers, this is their first official document from the Canadian government — and it contains important information about your tax situation, refund, and future contribution room.',
    sections: [
      {
        heading: 'What is a Notice of Assessment?',
        content: 'A Notice of Assessment (NOA) is the official confirmation from the Canada Revenue Agency that your tax return has been received and processed. It shows whether the CRA agrees with your return, calculates any refund or balance owing, and provides your RRSP and TFSA contribution room for the following year. It is one of the most important documents you receive as a taxpayer.'
      },
      {
        heading: 'When do you receive it?',
        content: 'If you filed electronically using NETFILE, your NOA typically arrives within two weeks. If you filed by paper, it can take up to eight weeks. You can access your NOA online through My Account at canada.ca as soon as it is processed, even before the physical copy arrives by mail. Set up direct deposit to receive any refund within 5 business days of the NOA being issued.'
      },
      {
        heading: 'Key sections to check',
        content: 'The Assessment section shows whether the CRA changed anything from your filed return and why. The Refund or Balance Owing section shows whether you receive money back or owe an amount. The RRSP Deduction Limit shows your available contribution room for next year. The TFSA Contribution Room shows how much you can contribute to your Tax-Free Savings Account. Always compare these numbers to what you expected.'
      },
      {
        heading: 'What if the CRA changed your return?',
        content: 'The CRA sometimes makes adjustments to your return — for example, if they have different T4 information from your employer, or if they disallow a deduction. Any changes are explained in the Explanation of Changes section of the NOA. Review these carefully. If you disagree with a change, you have 90 days from the date on the NOA to file a formal objection.'
      },
      {
        heading: 'How to file an objection',
        content: 'If you believe the CRA made an error on your NOA, you can file a Notice of Objection using Form T400A or through My Account online. You must file within 90 days of the NOA date. The CRA will review your objection and respond. If you remain unsatisfied, you can appeal to the Tax Court of Canada. Most straightforward errors are resolved at the objection stage without going to court.'
      },
      {
        heading: 'Keep your NOA in a safe place',
        content: 'Your Notice of Assessment is required to register for My CRA Account for the first time, to apply for certain loans where income verification is needed, and as proof of your tax status for various purposes. If you lose it, you can request a copy through My Account or by calling the CRA at 1-800-959-8281. Keep all NOAs for at least six years.'
      }
    ],
    cta: 'Questions about your Notice of Assessment or tax return? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'canada-groceries-essentials-benefit-newcomers-2026',
    title: 'Canada Groceries and Essentials Benefit 2026: What Newcomers Need to Know',
    metaTitle: 'Canada Groceries and Essentials Benefit 2026 — Guide for Newcomers | TaxNorth',
    description: 'The GST/HST credit is being replaced by the Canada Groceries and Essentials Benefit in July 2026. Learn what changed, how much you receive, and how newcomers can apply.',
    intro: 'If you heard about the GST/HST credit when you arrived in Canada, here is important news: starting July 2026, it is being replaced by a program called the Canada Groceries and Essentials Benefit — and it pays 25% more than before. Here is everything you need to know.',
    sections: [
      {
        heading: 'What is the Canada Groceries and Essentials Benefit?',
        content: 'The Canada Groceries and Essentials Benefit (CGEB) is a new federal program that replaces the GST/HST credit starting July 2026. Like the GST/HST credit, it is a tax-free quarterly payment from the Canadian government designed to help people with low and modest incomes. The key difference is that the new benefit pays 25% more than the old credit — and that increase is guaranteed for five years, through 2031. Approximately 12 million Canadians are expected to receive this benefit.'
      },
      {
        heading: 'What changed from the GST/HST credit?',
        content: 'The GST/HST credit and the new Groceries and Essentials Benefit work in the same way — you do not apply separately, the CRA calculates it automatically when you file your tax return, and payments arrive quarterly. The main changes are: the name is different, the payment amount is 25% higher, and the purpose is explicitly tied to helping with the cost of groceries and everyday essentials.'
      },
      {
        heading: 'Who is eligible?',
        content: 'Eligibility follows the same rules as the old GST/HST credit. You must be a Canadian resident for tax purposes, be 19 years of age or older, or have a spouse or common-law partner, or be a parent living with your child. Eligibility for the 2026-2027 benefit year is based on your 2025 net income reported on your tax return. Lower income means higher payments.'
      },
      {
        heading: 'How much do you receive?',
        content: 'Exact amounts depend on your family net income and the number of children you have. A single person with low income who previously received the GST/HST credit will receive approximately $136 more per year under the new benefit. Payments are made quarterly — in July, October, January, and April.'
      },
      {
        heading: 'How do newcomers apply?',
        content: 'If you arrived in Canada recently and have not yet filed a tax return, apply using Form RC151 — the GST/HST Credit and Groceries and Essentials Benefit Application for Individuals Who Become Residents of Canada. Download this form from canada.ca and mail it to the CRA. If you have children under 18, use Form RC66 instead — it covers both benefits in one form.'
      },
      {
        heading: 'Why this matters for newcomers especially',
        content: 'Many newcomers to Canada miss this benefit entirely because they do not know they need to file a tax return even with no income. Every year you do not file, you lose the quarterly payments you are entitled to receive. For a newcomer with low or modest income, this benefit can mean $400 to $700 or more per year — money the government has set aside for you that only gets activated when you file.'
      }
    ],
    cta: 'Questions about the Groceries and Essentials Benefit or any other Canadian tax topic? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'best-bank-accounts-newcomers-canada',
    title: 'Best Bank Accounts for Newcomers to Canada in 2026',
    metaTitle: 'Best Bank Accounts for Newcomers to Canada 2026 | TaxNorth',
    description: 'Compare the best Canadian bank accounts for newcomers in 2026. No-fee accounts, welcome bonuses up to $500, and unsecured credit cards with no Canadian credit history required.',
    intro: 'Opening a bank account is one of the first things you need to do when you arrive in Canada. The right account can save you hundreds of dollars in fees, give you a welcome bonus, and even help you get a credit card without any Canadian credit history. Here is an honest comparison of the best options in 2026.',
    sections: [
      {
        heading: 'What to look for in a newcomer bank account',
        content: 'Before comparing accounts, you need to know what actually matters. Monthly fees add up — a $16.95 per month fee costs you $203 per year that you could keep. Welcome bonuses are real money if you were planning to open an account anyway. And an unsecured credit card from a bank — one that does not require a security deposit — is the fastest way to start building Canadian credit history, which affects everything from renting an apartment to getting a car loan.'
      },
      {
        heading: 'Simplii Financial — Best no-fee account with a cash bonus',
        content: 'Simplii Financial (owned by CIBC) charges $0 forever with no minimum balance and no fee for unlimited transactions, e-Transfers, and bill payments. They are currently offering a $300 cash bonus plus a $50 gift card when you set up a direct deposit of at least $100 per month for three consecutive months. You can apply online if you landed within the last 5 years. You also get access to 3,400 CIBC ATMs across Canada with no withdrawal fees. The credit card limits for newcomers tend to be lower ($1,000 to $5,000) compared to the Big Five banks, which is worth noting if your priority is a high credit limit.'
      },
      {
        heading: 'Scotiabank StartRight — Best for a high credit limit',
        content: 'If getting an unsecured credit card with a high limit is your priority, Scotiabank StartRight is hard to beat. They offer limits up to $15,000 with no Canadian credit history — just proof of your landing documents and income. The first year of banking is free (saving $203.40 in fees) and you earn up to 50,000 Scene+ points worth approximately $500 in travel or groceries. After year one, you can keep the account free by maintaining a $4,000 minimum balance.'
      },
      {
        heading: 'RBC Newcomer Advantage — Best for international transfers',
        content: 'RBC is Canada\'s largest bank and their newcomer package includes free international money transfers for 12 months — a meaningful benefit if you are still sending money home or receiving it from abroad. The account has no monthly fee for one year and unlimited transactions. The credit card limit can also reach $15,000. The main consideration is that after year one, fees apply unless you maintain a minimum balance or upgrade your package.'
      },
      {
        heading: 'EQ Bank — Best interest rate on your deposits',
        content: 'EQ Bank is entirely digital but it offers something the Big Five cannot match: 1.00% interest on every dollar in your account, rising to 2.75% when you maintain a qualifying direct deposit of $2,000 per month. On a $10,000 balance, that is $275 per year just sitting in your account. There are no fees, free ATM withdrawals, and zero FX markups on the EQ Bank Card. The downside: EQ Bank does not offer credit cards, so you would need a separate account for credit building.'
      },
      {
        heading: 'KOHO — Best for building credit without a deposit',
        content: 'KOHO is a Canadian fintech whose account earns 3.5% interest and comes with a prepaid Mastercard. Their Credit Builder program ($10 per month) reports your payments to Equifax and starts building your Canadian credit history with no security deposit and no credit check required. Within 6 to 12 months of using KOHO Credit Builder alongside a bank account, most newcomers are approved for mainstream credit cards.'
      },
      {
        heading: 'The honest recommendation',
        content: 'For most newcomers, the smartest move is to open two accounts: Scotiabank StartRight or RBC for the unsecured credit card and branch access, and either Simplii Financial or EQ Bank for day-to-day banking at no cost. If you have limited income in your first months and need to build credit without a deposit, add KOHO Credit Builder for $10 per month. This combination gives you a high credit limit, no fees, and a credit history in progress.'
      }
    ],
    affiliates: [
      {
        name: 'Simplii Financial',
        description: '$0 forever + $300 cash bonus + $50 gift card. Apply online if you arrived in the last 5 years.',
        link: 'https://www.simplii.com/en/banking-simplii/join-simplii/new-to-canada.html',
        badge: 'Best no-fee account'
      },
      {
        name: 'Scotiabank StartRight',
        description: '1 year free + up to $15,000 unsecured credit limit + 50,000 Scene+ points (~$500).',
        link: 'https://startright.scotiabank.com',
        badge: 'Best credit limit'
      },
      {
        name: 'EQ Bank',
        description: '$0 fees + up to 2.75% interest on every dollar with direct deposit.',
        link: 'https://www.eqbank.ca/personal-banking/personal-account',
        badge: 'Best interest rate'
      },
      {
        name: 'KOHO',
        description: 'Free Core Account with 3.5% interest and a prepaid Mastercard. Cash advance up to $500 with KOHO Cover.',
      link: 'https://kohofinancial.pxf.io/c/7846688/1274983/15676?adnetwork=Impact&u=https%3A%2F%2Fwww.koho.ca%2Fnew-to-canada%2F',
        badge: 'Best for credit building'
      }
    ],
    cta: 'Questions about banking in Canada or which account is right for you? Ask TaxNorth — free, in any language.'
  },
  {
    slug: 'build-credit-canada-newcomer',
    title: 'How to Build Credit in Canada as a Newcomer',
    metaTitle: 'How to Build Credit in Canada as a Newcomer — Complete Guide 2026 | TaxNorth',
    description: 'Step-by-step guide to building Canadian credit history from zero. Best secured cards, credit builders, and strategies for newcomers without Canadian credit history.',
    intro: 'When you arrive in Canada, your credit history from your home country does not transfer. You start from zero on both Equifax and TransUnion — Canada\'s two main credit bureaus. This affects your ability to rent an apartment, get a cell phone plan without a deposit, qualify for a car loan, and eventually a mortgage. The good news: you can build a solid Canadian credit score in 12 to 18 months with the right approach.',
    sections: [
      {
        heading: 'Why your home country credit history does not transfer',
        content: 'Credit bureaus in different countries do not share data. Your excellent credit score from your home country means nothing to a Canadian lender. There is one exception: American Express has a global card transfer program that allows US cardholders to bring their history to Canada. For everyone else, you start fresh. This is not a judgment on your financial history — it is simply how the system is built. The faster you understand this, the faster you can fix it.'
      },
      {
        heading: 'Option 1 — Get an unsecured credit card through a newcomer bank package',
        content: 'The fastest way to start building credit is an unsecured credit card — one that does not require a security deposit. Scotiabank StartRight and RBC Newcomer Advantage both offer unsecured Mastercard or Visa cards with limits up to $15,000 to newcomers who can show proof of landing documents and income. You do not need Canadian credit history. Once you have the card, use it for regular purchases, pay the full statement balance every month, and keep your balance under 30% of your limit. This single action builds your credit faster than anything else.'
      },
      {
        heading: 'Option 2 — KOHO Credit Builder (no deposit required)',
        content: 'If you do not yet qualify for an unsecured credit card, KOHO Credit Builder is the most accessible option. For $10 per month, KOHO establishes a small line of credit in your name and reports your monthly payments to Equifax. There is no security deposit, no credit check, and no interest charged. After 6 to 12 months of consistent on-time payments, most newcomers see enough credit history to qualify for mainstream products. KOHO now reports to both Equifax and TransUnion. For the most complete profile, pair it with another product.'
      },
      {
        heading: 'Option 3 — Neo Financial Secured Mastercard',
        content: 'If you want a secured credit card that reports to both credit bureaus, Neo Financial is one of the best options. You deposit money as collateral (your deposit equals your credit limit), and Neo reports your payment activity to both Equifax and TransUnion monthly. The card also offers cash back at hundreds of Canadian partner merchants — so you earn rewards while building credit. There is no minimum credit score required for approval.'
      },
      {
        heading: 'Check your score for free with Borrowell',
        content: 'Once you have a credit product open and a few months of history, check your Equifax credit score for free using Borrowell. It takes about 3 minutes and does not affect your score (it is a soft inquiry). Knowing your score helps you track progress and understand when you are ready to apply for better products. Borrowell also shows you which factors are helping or hurting your score.'
      },
      {
        heading: 'The rules that actually move your score',
        content: 'Payment history makes up 35% of your credit score. Pay your full statement balance before the due date, every single month, without exception. Late payments stay on your credit report for up to 6 years. Credit utilization makes up 30% of your score — keep your card balance below 30% of your limit at all times. Length of credit history matters too: your very first card is your most valuable. Keep it open forever, even if you eventually get better cards.'
      },
      {
        heading: 'How long does it take to build a good score?',
        content: 'With an unsecured bank credit card and consistent on-time payments at under 30% utilization, most newcomers reach a score of 650 to 720 within 12 months. A score of 720 or above is considered good and opens the door to competitive mortgage rates, car loans, and premium credit cards. The fastest path to 750+ is to have at least two different credit products, pay everything on time, keep balances low, and avoid applying for multiple new products within a short period.'
      }
    ],
    affiliates: [
      {
        name: 'KOHO Credit Builder',
        description: 'Free Core Account with 3.5% interest. Credit building available as a separate add-on. Reports to both credit bureaus.',
      link: 'https://kohofinancial.pxf.io/c/7846688/1274983/15676?adnetwork=Impact&u=https%3A%2F%2Fwww.koho.ca%2Fnew-to-canada%2F',
        badge: 'No deposit required'
      },
      {
        name: 'Neo Financial Secured Card',
        description: 'Guaranteed approval — reports to both Equifax and TransUnion. Earn cash back while building credit.',
        link: 'https://www.neofinancial.com',
        badge: 'Reports to both bureaus'
      },
      {
        name: 'Borrowell',
        description: 'Check your Equifax credit score for free in 3 minutes. No impact on your score.',
        link: 'https://www.borrowell.com',
        badge: 'Free credit score'
      }
    ],
    cta: 'Questions about credit in Canada or how to get started? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'best-tfsa-rrsp-accounts-newcomers-canada',
    title: 'Best TFSA and RRSP Accounts for Newcomers to Canada in 2026',
    metaTitle: 'Best TFSA and RRSP Accounts for Newcomers Canada 2026 | TaxNorth',
    description: 'Compare the best TFSA and RRSP accounts for newcomers in Canada. Learn the rules, 2026 contribution limits, and which platforms are best for beginners.',
    intro: 'Two of the most powerful tools for building wealth in Canada are the TFSA and the RRSP. As a newcomer, understanding these accounts early — and using them correctly — can make a significant difference in your long-term financial picture. Here is everything you need to know.',
    sections: [
      {
        heading: 'TFSA vs RRSP — which one should you open first?',
        content: 'The short answer for most newcomers: start with the TFSA. Contributions are not tax-deductible, but all growth and withdrawals are completely tax-free — forever. You can take money out at any time for any reason and the contribution room comes back the following January. The RRSP works in reverse: contributions are tax-deductible (you get a tax refund now), but withdrawals are taxed as income later. The RRSP is more powerful when you are in a high tax bracket. For most newcomers in their first years — still building income in a lower bracket — the TFSA gives more flexibility with no tax risk on growth.'
      },
      {
        heading: 'TFSA rules for newcomers — the critical detail',
        content: 'Your TFSA contribution room starts accumulating from the year you become a Canadian resident — not from when you turned 18 in your home country. If you arrived in 2025, your 2025 room was $7,000. Your 2026 room is another $7,000. That gives you $14,000 of total room as of 2026 if you arrived in 2025. The mistake many newcomers make is contributing more than their room — the CRA charges a 1% per month penalty on the excess. Always check your available room through My CRA Account before contributing.'
      },
      {
        heading: 'RRSP rules for newcomers',
        content: 'Your RRSP contribution limit is 18% of your previous year\'s earned income in Canada, up to the annual maximum ($32,490 for 2025, $33,810 for 2026). In your first year, you may have little or no RRSP room because the calculation is based on the prior year. Foreign income earned before you arrived in Canada does not create RRSP room — only Canadian earned income counts.'
      },
      {
        heading: 'Wealthsimple — Best for beginners and hands-off investors',
        content: 'Wealthsimple is the most popular investment platform among newcomers in Canada. Their TFSA and RRSP accounts charge zero trading commissions on Canadian and US stocks and ETFs. For those who prefer not to pick individual investments, Wealthsimple Managed Investing builds a diversified portfolio of index ETFs automatically for a management fee of 0.40% to 0.50% per year. The app is clean, available in multiple languages, and opening an account takes about 10 minutes with just your SIN and a government ID.'
      },
      {
        heading: 'EQ Bank — Best for guaranteed returns without market risk',
        content: 'If investing in stocks makes you uncomfortable, EQ Bank offers TFSA and RRSP savings accounts that earn interest with zero market risk. Your money is CDIC-insured and you earn a competitive interest rate that beats most bank savings accounts. You can also lock in higher rates with TFSA GICs (Guaranteed Investment Certificates) for 1 to 5 years. This is the right choice if you are saving for a specific goal within the next few years and cannot afford to lose any principal.'
      },
      {
        heading: 'The First Home Savings Account (FHSA) — A third option for home buyers',
        content: 'If you plan to buy your first home in Canada, the First Home Savings Account combines the best of both worlds: contributions are tax-deductible like an RRSP, and withdrawals for a qualifying home purchase are completely tax-free like a TFSA. You can contribute up to $8,000 per year with a lifetime limit of $40,000. As a newcomer who has never owned a home in Canada, you almost certainly qualify. Wealthsimple and EQ Bank both offer FHSAs alongside their TFSA and RRSP accounts.'
      }
    ],
    affiliates: [
      {
        name: 'Wealthsimple',
        description: '$0 trading commissions. Open a TFSA, RRSP, or FHSA in 10 minutes. Available in multiple languages.',
        link: 'https://www.wealthsimple.com/en-ca/accounts/tfsa',
        badge: 'Best for beginners'
      },
      {
        name: 'EQ Bank',
        description: 'TFSA savings at up to 2.75% interest — no market risk, CDIC insured. No fees.',
        link: 'https://www.eqbank.ca/personal-banking/tfsa',
        badge: 'Best guaranteed rate'
      }
    ],
    cta: 'Questions about TFSAs, RRSPs, or where to start investing? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'register-business-canada-newcomer',
    title: 'How to Register a Business in Canada as a Newcomer',
    metaTitle: 'How to Register a Business in Canada as a Newcomer | TaxNorth',
    description: 'Step-by-step guide to registering a business in Canada as a newcomer — sole proprietorship vs incorporation, costs, tax implications, and what to do first.',
    intro: 'Many newcomers arrive in Canada with entrepreneurial ambitions — or find themselves doing freelance work that requires registering a business. The process is more straightforward than most people expect, but the choice between a sole proprietorship and incorporation has real tax consequences. Here is what you need to know before you register.',
    sections: [
      {
        heading: 'Sole proprietorship vs incorporation — which one is right for you?',
        content: 'A sole proprietorship is the simplest structure. You register your business name with your province and all income flows directly to your personal tax return. It costs $60 to $100 to register in most provinces and takes about a day. The downside: you are personally liable for all business debts, and all profit is taxed at your personal marginal rate. Incorporation creates a separate legal entity taxed at a lower corporate rate (typically 9-12% on the first $500,000 of active business income in Canada). However, incorporation costs $500 to $2,000 to set up and requires ongoing maintenance. For most newcomers starting out with moderate self-employment income, a sole proprietorship is the right starting point. Once your annual profit consistently exceeds $50,000 to $80,000, talk to a CPA about incorporating.'
      },
      {
        heading: 'What you need before you register',
        content: 'To register a business in Canada, you need: a valid Social Insurance Number (SIN), a Canadian address, a government-issued ID, and your chosen business name (which must be searched to confirm availability). You will also need a business bank account — your personal account should never be mixed with business finances.'
      },
      {
        heading: 'The tax implications of being self-employed in Canada',
        content: 'When you are self-employed, no one withholds tax from your payments. You are responsible for setting aside money for taxes throughout the year. Set aside 25-30% of every payment you receive. You will also pay both the employee and employer portions of CPP contributions — approximately 11.9% of your net self-employment income up to the annual maximum. If your total business revenues exceed $30,000 in any four consecutive quarters, you must register to collect GST or HST and remit it to the CRA.'
      },
      {
        heading: 'Registering your business name in your province',
        content: 'In most provinces, you register a sole proprietorship directly with the provincial government registry. In Ontario, with Service Ontario. In Alberta, with Service Alberta. In British Columbia, with BC Registry Services. The cost is typically $60 to $100 and processing takes 1 to 3 business days online. If you are incorporating federally, you register with Corporations Canada for $200 online.'
      },
      {
        heading: 'Getting a Business Number from the CRA',
        content: 'Once registered provincially, you need a Business Number (BN) from the CRA to handle GST/HST and corporate tax if you incorporate. Register for your BN online through the CRA Business Registration Online portal at canada.ca. It is free and takes about 15 minutes. The BN is a 9-digit number that stays with your business permanently.'
      }
    ],
    affiliates: [
      {
        name: 'Ownr',
        description: 'Canada\'s leading business registration platform. Register your sole proprietorship or incorporate online — trusted by 270,000+ Canadians.',
        link: 'https://partners.ownr.co/f842lqsbq1c1',
        badge: 'Fastest registration'
      }
    ],
    cta: 'Questions about taxes for your Canadian business? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'best-accounting-software-self-employed-newcomers',
    title: 'Best Accounting Software for Self-Employed Newcomers in Canada',
    metaTitle: 'Best Accounting Software for Self-Employed Newcomers Canada 2026 | TaxNorth',
    description: 'Compare FreshBooks, QuickBooks, and Xero for self-employed newcomers in Canada. Track income, expenses, invoices, and prepare for tax time without an accounting background.',
    intro: 'If you are self-employed in Canada — freelancing, consulting, running a small business — you need to track your income and expenses properly. Not just for tax purposes, but because knowing your actual numbers is the difference between a thriving practice and one that runs out of cash without warning. Here is an honest comparison of the top options for newcomers.',
    sections: [
      {
        heading: 'Why proper bookkeeping matters more than you think',
        content: 'Many self-employed newcomers track income and expenses in a spreadsheet — or worse, in their head. This works until tax season arrives and the CRA asks for receipts, or until you try to get a business loan and cannot show proper financial statements. Without accurate books you have no idea whether your business is actually profitable after expenses. Modern accounting software automates most of this — you connect your bank account, categorize transactions as they happen, and the software does the rest. Tax time becomes a matter of exporting one report instead of reconstructing months of transactions in a panic.'
      },
      {
        heading: 'FreshBooks — Best for service-based freelancers and consultants',
        content: 'FreshBooks is built for people who sell their time and expertise — consultants, designers, writers, coaches, and contractors. Its invoicing is best in class: professional-looking invoices, automatic payment reminders, and the ability to accept credit card payments directly through the invoice. For Canadian users, FreshBooks handles HST/GST tracking and generates the T2125 business income report you need to file your taxes. The Lite plan starts at $19 CAD per month for up to 5 clients, which covers most freelancers starting out.'
      },
      {
        heading: 'QuickBooks Self-Employed — Best for tracking mileage and home office',
        content: 'QuickBooks Self-Employed is designed specifically for sole proprietors and freelancers. It automatically imports transactions from your bank, separates personal from business expenses, and tracks mileage using your phone\'s GPS — useful for newcomers who drive for work and want to claim the vehicle deduction. It starts at approximately $9.99 CAD per month. The limitation: once your business grows beyond basic freelancing, you will need to upgrade to QuickBooks Online.'
      },
      {
        heading: 'Xero — Best for growing businesses with multiple needs',
        content: 'Xero is more powerful than FreshBooks or QuickBooks Self-Employed and is better suited to businesses that are growing — those with employees, inventory, multiple bank accounts, or more complex reporting needs. It integrates with hundreds of third-party apps and is the preferred platform of most Canadian accountants, which makes it easy to share access with a CPA. It starts at $20 CAD per month. Xero becomes the right choice when your business reaches $100,000 or more in annual revenue or when you hire your first employee.'
      },
      {
        heading: 'The honest recommendation based on your situation',
        content: 'If you are a freelancer or consultant with fewer than 20 clients: start with FreshBooks. Clean invoices, simple expense tracking, and it handles Canadian taxes correctly. If you drive for work and need mileage tracking: add QuickBooks Self-Employed. If your business is growing and you are working with a CPA: move to Xero when you are ready for more structure. Whatever you choose, connect it to your business bank account from day one.'
      }
    ],
    affiliates: [
      {
        name: 'FreshBooks',
        description: 'Best invoicing and GST/HST tracking for Canadian freelancers. Generates the T2125 report automatically.',
        link: 'https://www.freshbooks.com/campaign/canada',
        badge: 'Best for freelancers'
      },
      {
        name: 'QuickBooks',
        description: 'Mileage tracking, automatic expense categorization, and CRA-ready reports.',
        link: 'https://quickbooks.intuit.com/ca/',
        badge: 'Best for mileage'
      },
      {
        name: 'Xero',
        description: 'Best for growing businesses working with a CPA. Integrates with 800+ apps.',
        link: 'https://www.xero.com/ca/',
        badge: 'Best for growth'
      }
    ],
    cta: 'Questions about taxes for your self-employed income? Ask TaxNorth — free guidance in any language.'
  }
]

export function getResource(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug)
}