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
        heading: 'Option 2 — KOHO Core Account (free, no deposit required)',
        content: 'KOHO\'s Core Account is permanently free and earns 3.5% interest on your balance with a prepaid Mastercard. There is no security deposit and no credit check required. KOHO also offers a credit building feature available as a separate add-on — it reports to both Equifax and TransUnion. After 6 to 12 months of consistent payments, most newcomers see enough credit history to qualify for mainstream products. For the most complete profile, pair it with another product.'
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
    cta: 'Questions about taxes for your self-employed income? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'notice-of-assessment-canada',
    title: 'What is a Notice of Assessment in Canada?',
    metaTitle: 'Notice of Assessment Canada: Guide for Newcomers | TaxNorth',
    description: 'Learn what a Notice of Assessment is, why every newcomer in Canada needs it, and how to read yours. Free, plain-language guide from TaxNorth.',
    intro: 'If you recently filed your first Canadian tax return, you might be waiting for a document called a Notice of Assessment. This guide explains exactly what it is, why it matters for your life in Canada, and how to read it with confidence.',
    sections: [
      {
        heading: 'What is a Notice of Assessment?',
        content: 'The Canada Revenue Agency reviews every tax return you file. After processing yours, they send you a Notice of Assessment. Think of it as your official tax receipt from the government — it confirms your return was processed and shows your final tax result for the year. It tells you whether you owe money, whether the government owes you a refund, or whether your balance is zero.'
      },
      {
        heading: 'Why newcomers need their Notice of Assessment',
        content: 'Your Notice of Assessment is one of the most important documents you will use in Canada. Immigration applications often require it as proof that you are filing your taxes. Landlords and mortgage lenders use it to verify your income when you rent or buy a home. Student loan offices review it to determine your eligibility for financial assistance. Keep every Notice of Assessment you receive for at least six years.'
      },
      {
        heading: 'How to get your Notice of Assessment',
        content: 'If you filed your tax return by mail, the CRA mails your Notice of Assessment to your home address. Allow several weeks for processing. If you filed electronically using NETFILE, your Notice of Assessment is typically available online within two weeks. You can view it anytime through My CRA Account at canada.ca, often before the paper copy arrives.'
      },
      {
        heading: 'How to read your Notice of Assessment',
        content: 'Your Notice of Assessment is usually one or two pages. It shows the income you reported, the taxes you paid during the year, and your final result — either a refund amount or a balance owing. It also shows your RRSP deduction limit for the following year. If the CRA made any changes to your return, those changes are explained in the assessment. Review it carefully and compare it to what you filed.'
      },
      {
        heading: 'What if you disagree with the assessment?',
        content: 'If the CRA changed something on your return and you believe it is wrong, you have 90 days from the date on the Notice of Assessment to file a formal objection. You can do this through My CRA Account or by mailing Form T400A. Most straightforward errors are resolved at this stage without needing to go to court.'
      }
    ],
    cta: 'Questions about your Notice of Assessment or what to do next? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'refugee-claimant-taxes-canada',
    title: 'How to File Taxes in Canada as a Refugee Claimant',
    metaTitle: 'Refugee Claimant Taxes Canada: Free Filing Guide | TaxNorth',
    description: 'Are you a refugee claimant in Canada? Learn how to file your taxes, apply for benefits and get a temporary SIN. Free, plain-language tax help.',
    intro: 'As a refugee claimant in Canada, filing your taxes is a powerful step toward securing your financial future and accessing government support. Your immigration status does not prevent you from participating in the tax system. You have the right to file a tax return, and doing so unlocks benefits your family may be entitled to receive.',
    sections: [
      {
        heading: 'Can refugee claimants file taxes in Canada?',
        content: 'Yes. The Canada Revenue Agency considers you a resident for tax purposes as soon as you establish residential ties in Canada, such as setting up a home, opening a bank account, or living with family here. Your immigration status does not prevent you from filing. You have the right to file a tax return just like any other person living in Canada.'
      },
      {
        heading: 'Why you should file even with no income',
        content: 'Many newcomers think they only need to file taxes if they have a job. In Canada, that is not the case. Even if you earned zero income or only received social assistance, you should still file a tax return. Filing is the only way to unlock the Canada Child Benefit if you have children, the Canada Groceries and Essentials Benefit paid quarterly, and provincial benefits depending on where you live. Every year you do not file is a year you miss those payments.'
      },
      {
        heading: 'What identification number do you need?',
        content: 'To file taxes in Canada, you need a Social Insurance Number (SIN), a nine-digit number issued by the government. Refugee claimants with a work permit can apply for a SIN at a Service Canada office. If your SIN starts with the number 9, it is a temporary SIN for people who are not yet permanent residents. If you cannot get a SIN, you can request a Temporary Tax Number directly from the CRA, or mail a paper return with a letter explaining your situation.'
      },
      {
        heading: 'How to file your first tax return',
        content: 'Gather all your income slips showing how much money you received during the year. Complete Form T1 Income Tax and Benefit Return. Because it may be your first time filing, you may need to print the forms and mail them rather than filing online. Keep copies of everything you send. Also complete the forms for newcomer benefits so your credit payments can start as soon as possible.'
      },
      {
        heading: 'Social assistance and taxes',
        content: 'Social assistance payments are not taxed in Canada. However, you still need to report them on your tax return so the government can accurately calculate the benefits you are eligible to receive. Not reporting them can result in overpayments that the CRA later asks you to repay.'
      },
      {
        heading: 'Free tax help for refugee claimants',
        content: 'The Community Volunteer Income Tax Program (CVITP) offers free tax filing help at locations across Canada, including settlement agencies and community centres that serve newcomers. Many locations have staff or volunteers who speak multiple languages. Search for a clinic near you at canada.ca/taxes-help.'
      }
    ],
    cta: 'Questions about filing taxes as a refugee claimant? Ask TaxNorth — free, step-by-step guidance in your language.'
  },
  {
    slug: 'cra-account-setup-newcomer',
    title: 'How to Set Up Your CRA My Account as a Newcomer',
    metaTitle: 'CRA Account Setup for Newcomers Canada: Step-by-Step Guide | TaxNorth',
    description: 'Learn exactly when and how to register for CRA My Account as a newcomer to Canada. Step-by-step guide in plain language.',
    intro: 'CRA My Account is your personal online portal with the Canada Revenue Agency. It lets you view your tax documents, check your benefit payments, update your direct deposit information, and track your RRSP and TFSA room, all in one place. Here is exactly how to set it up.',
    sections: [
      {
        heading: 'The most important rule: file your taxes first',
        content: 'You cannot register for CRA My Account before you file your very first Canadian tax return. The system uses information from your processed return to verify your identity. File your taxes, wait for the CRA to process your return (typically two weeks if filed electronically), and only then register. There are no exceptions to this rule.'
      },
      {
        heading: 'What you need before you start',
        content: 'Once your first return has been processed, gather these items before you begin. The system has an 18-minute time limit and will log you out if you take too long. You will need your Social Insurance Number, your exact date of birth, and a copy of the tax return you filed. The system asks you to enter a specific number from a specific line on your return to confirm your identity.'
      },
      {
        heading: 'Option 1: Sign in with your bank (easiest)',
        content: 'The easiest way to register is to use a Sign-In Partner, which means using your existing Canadian online banking username and password. Your bank confirms your identity with the CRA securely. This saves you from creating and remembering another password. Most major Canadian banks are supported including RBC, TD, Scotiabank, BMO, and CIBC.'
      },
      {
        heading: 'Option 2: Create a CRA user ID and password',
        content: 'If you prefer not to use your bank login, you can create a dedicated CRA user ID and password. Choose a strong password and write it down somewhere safe. You will also be required to set up multi-factor authentication. The CRA sends a passcode to your phone each time you log in to confirm it is really you.'
      },
      {
        heading: 'Completing your identity verification',
        content: 'After the initial setup, the CRA requires one final verification to unlock full account access. You can verify your identity using your mobile device camera, or the CRA will mail a physical security code to your home address. This can take 5 to 10 business days. Once you enter the code, your account is fully active.'
      },
      {
        heading: 'What you can do once your account is set up',
        content: 'With a fully active CRA My Account you can view your Notice of Assessment and previous tax returns, check your RRSP and TFSA contribution room, update your direct deposit information for faster refunds and benefit payments, apply for the Canada Child Benefit, track benefit payment dates, and update your address when you move.'
      }
    ],
    cta: 'Questions about setting up your CRA account or anything else about Canadian taxes? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'social-insurance-number-newcomer-canada',
    title: 'How to Get Your Social Insurance Number (SIN) in Canada',
    metaTitle: 'How to Get a SIN in Canada: Step-by-Step Newcomer Guide | TaxNorth',
    description: 'Learn how to get your Social Insurance Number (SIN) in Canada for free through Service Canada. Required documents, processing times, and rules for newcomers.',
    intro: 'Before you can start working or filing taxes in Canada, you need a Social Insurance Number (SIN). This nine-digit number is your official ID for government services and employers. Getting one is one of the first and most important steps in your Canadian journey.',
    sections: [
      {
        heading: 'Who issues your SIN?',
        content: 'Your Social Insurance Number is issued by Service Canada, not the Canada Revenue Agency. You need this number to work legally and file your tax return. The application is completely free. Service Canada no longer issues plastic cards. Instead, you receive a paper Confirmation of SIN letter. Keep this letter safe at home and never carry it in your wallet to protect yourself from identity theft.'
      },
      {
        heading: 'Documents you need to apply',
        content: 'To apply, you need one valid primary identity document. If you are a permanent resident, you can use your PR card or your Confirmation of Permanent Residence (COPR) along with your passport. If you are a temporary resident, you need your valid work permit or study permit. Your permit must explicitly state that you are authorized to work in Canada. You also need a secondary document such as a passport or government-issued ID to confirm your identity. If your documents are not in English or French, you must provide a certified translation.'
      },
      {
        heading: 'How to apply for your SIN',
        content: 'You can apply online, by mail, or in person at a Service Canada Centre. Applying in person is usually the fastest option. If you bring all your original documents to an office, you will typically receive your SIN the same day. Online applications require clear digital scans of your documents and can take a few weeks to process. If you apply by mail, you must send your original documents, which many people find stressful. In person or online is generally the better choice.'
      },
      {
        heading: 'Understanding temporary SINs starting with 9',
        content: 'If you are in Canada on a work or study permit, your SIN will start with the number 9. This means your number is temporary and tied to your current immigration status. Your SIN expires on the same day your permit expires. When you renew your permit, you must also update your SIN record with Service Canada. If you become a permanent resident later, your SIN will change to a permanent one.'
      },
      {
        heading: 'Applying for a SIN for your children',
        content: 'Anyone 12 years of age or older can apply for their own SIN. If you have children under the legal age of majority in your province, you can apply on their behalf as a parent or legal guardian. Getting a SIN for your children early is helpful if you plan to open a Registered Education Savings Plan (RESP) to save for their future education.'
      },
      {
        heading: 'Frequently asked questions about the SIN',
        content: 'How much does it cost to get a SIN? Getting a SIN is completely free. Never pay a third-party website that promises to get a SIN for you. Can I start working before I receive my SIN? You can start working if you have already applied and are waiting, as long as your permit allows you to work. What happens if my work permit expires? Your SIN becomes invalid for new employment. You must renew your immigration status first and then update your SIN record.'
      }
    ],
    cta: 'Questions about getting your SIN or what to do first when you arrive in Canada? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'foreign-income-reporting-canada-newcomer',
    title: 'Foreign Income and Taxes in Canada: A Guide for Newcomers',
    metaTitle: 'Foreign Income Taxes Canada: Newcomer Filing Guide | TaxNorth',
    description: 'Understand how Canada taxes foreign income for newcomers. Learn the part-year residency rule, foreign tax credits, and the first-year T1135 exemption.',
    intro: 'Many newcomers worry about being taxed twice on money they earned before arriving in Canada. The good news is that Canada has clear rules to protect you. Understanding when your Canadian residency officially begins makes the whole picture much simpler.',
    sections: [
      {
        heading: 'The part-year residency rule',
        content: 'Canada only taxes your worldwide income starting on the exact date you arrive and establish residential ties. Any income you earned in your home country before your landing date is not taxed by Canada. Once you officially settle here, Canada expects you to report all income you earn from anywhere in the world going forward.'
      },
      {
        heading: 'Do I report income earned before I moved to Canada?',
        content: 'No. You do not pay Canadian tax on money earned while living in your home country before you moved. On your first tax return, you only report worldwide income for the part of the year you actually lived in Canada. You will be asked to declare your pre-arrival income to determine eligibility for certain credits, but that income is not taxed by Canada.'
      },
      {
        heading: 'Avoiding double taxation with foreign tax credits',
        content: 'If you continue to earn income from your home country after moving to Canada, you must report it. But if your home country also taxes that income, Canada has tax treaties with many countries to prevent you from paying twice. You can usually claim a Foreign Tax Credit on your Canadian return using Form T2209. This credit reduces your Canadian tax by the amount you already paid abroad on the same income.'
      },
      {
        heading: 'Reporting foreign property and the first-year exemption',
        content: 'If you own foreign property worth more than $100,000 CAD, such as real estate or bank accounts, you must generally report it to the CRA using Form T1135. However, there is a helpful rule for newcomers: you do not have to file Form T1135 for the tax year you first become a Canadian resident. This gives you time to organize your finances without facing complicated forms in your very first year.'
      },
      {
        heading: 'How Canada values assets you owned before arriving',
        content: 'If you own a home or investments in your home country when you move to Canada, the CRA treats the fair market value on your arrival date as your starting cost. This means if you sell those assets years later, Canada only taxes the profit they made after you became a resident, not the value they gained before you arrived.'
      },
      {
        heading: 'Frequently asked questions about foreign income',
        content: 'Do I have to declare bank accounts from my home country? Yes, if the total value of your foreign assets exceeds the reporting threshold (generally $100,000 CAD), though you have an exemption in your very first year in Canada. What exchange rate do I use for foreign income? Convert foreign income to Canadian dollars using the Bank of Canada exchange rate for the day you received the money, or the average annual rate. Will Canada tax the house I still own back home? Canada does not tax the property just for owning it. If you rent it out, you must report the rental income. If you sell it, you may owe tax on the increase in value since the day you arrived in Canada.'
      }
    ],
    cta: 'Foreign income rules can be confusing in your first year. Ask TaxNorth for free, plain-language answers in any language.'
  },
  {
    slug: 'moving-expenses-tax-deduction-canada',
    title: 'Moving Expenses Tax Deduction in Canada: What Newcomers Need to Know',
    metaTitle: 'Moving Expenses Tax Deduction Canada: Newcomer Eligibility | TaxNorth',
    description: 'Find out if you can deduct moving costs on your Canadian tax return. Learn the CRA 40-kilometre rule, eligible expenses, and important limits for newcomers.',
    intro: 'Moving is expensive, and Canada does allow a moving expense deduction on your tax return. However, the rules for newcomers arriving from outside Canada are strict and often misunderstood. This guide explains exactly who qualifies so you can avoid costly mistakes.',
    sections: [
      {
        heading: 'Can I claim my move from my home country to Canada?',
        content: 'Under CRA rules, you generally cannot deduct moving expenses for a move from outside Canada. The standard deduction only applies if you were already a Canadian resident before the move. Most newcomers moving to Canada for the first time cannot claim international flights, shipping costs, or other relocation expenses. An exception exists for full-time international students earning taxable Canadian scholarship income, but this does not apply to most newcomers.'
      },
      {
        heading: 'When newcomers can claim moving expenses',
        content: 'You can claim moving expenses if you relocate between cities within Canada after you have already arrived and settled. For example, if you land in Toronto and later move to Calgary for a new job, that domestic move may be fully deductible. The move must be for a new job, to run a business, or to attend school full time.'
      },
      {
        heading: 'The 40-kilometre rule',
        content: 'To qualify for the moving expense deduction using Form T1-M, your new home must bring you at least 40 kilometres closer to your new workplace or school. This distance is measured by the shortest normal public route. Moving to a different apartment in the same city usually does not meet this requirement.'
      },
      {
        heading: 'What expenses are eligible for domestic moves',
        content: 'If your move qualifies, you can claim travel costs for you and your family, up to 15 days of temporary meals and lodging near your old or new home, moving company or truck rental fees, and costs associated with breaking your old lease. You cannot claim job search trips, passport fees, or new furniture purchases.'
      },
      {
        heading: 'The income limitation on this deduction',
        content: 'You can only deduct moving expenses against the income you earn at your new work location. You cannot use them to reduce taxes on investment income or earnings from before you moved. If your moving costs are higher than what you earned at your new job in the first year, you can carry the remainder forward to deduct in a future year.'
      },
      {
        heading: 'Frequently asked questions about moving expense deductions',
        content: 'Can I claim my flight to Canada as a moving expense? Generally no, unless you were already a Canadian tax resident before you moved or you are a full-time student with specific taxable income. Most first-time newcomers cannot claim this. Do I need to keep my receipts? Yes. You do not submit them when you file, but the CRA may ask to see them later. Keep all receipts for at least six years. What if my employer paid for my move? If your employer reimbursed your moving costs, you cannot claim those same expenses unless the reimbursement was included as taxable income on your T4 slip.'
      }
    ],
    cta: 'Not sure what moving costs you can deduct? Ask TaxNorth for free, plain-language answers in any language.'
  }
    ,{
    slug: 'medical-expense-tax-credit-canada',
    title: 'Medical Expense Tax Credit in Canada: What Newcomers Can Claim',
    metaTitle: 'Medical Expense Tax Credit Canada: Newcomer Guide | TaxNorth',
    description: 'Find out how newcomers can claim the medical expense tax credit in Canada. Learn what expenses qualify and get more of your money back.',
    intro: 'Paying for healthcare in a new country can be stressful, especially when you have out-of-pocket costs for dental care, prescription glasses, or medications. The Canada Revenue Agency (CRA) offers the Medical Expense Tax Credit to help you recover some of those costs. If you are a newcomer filing your Canadian taxes for the first time, this guide shows you exactly how this credit works.',
    sections: [
      {
        heading: 'What is the Medical Expense Tax Credit?',
        content: 'The Medical Expense Tax Credit (METC) is a non-refundable tax credit offered by the Canadian government. It reduces the amount of federal income tax you owe if you have significant medical expenses. While it does not give you a direct cash refund if your tax bill is already zero, it can substantially lower the taxes you have to pay if you are working in Canada.'
      },
      {
        heading: 'Can newcomers claim medical expenses in Canada?',
        content: 'Yes. To qualify, you simply need to be considered a resident of Canada for tax purposes during the tax year. International students, permanent residents, and work permit holders who file a Canadian tax return are generally eligible. You can claim eligible medical expenses paid for yourself, your spouse or common-law partner, and your dependent children under 18.'
      },
      {
        heading: 'What expenses qualify?',
        content: 'Many newcomers are surprised by how many common healthcare costs qualify. You can claim prescription medications, dental services like cleanings and fillings, prescription eyeglasses or contact lenses, and fees paid to licensed medical practitioners like physiotherapists. You cannot claim over-the-counter medications, vitamins, or fitness club memberships. Always check the official CRA list to confirm whether a specific expense is eligible before claiming it.'
      },
      {
        heading: 'Plain language explainer: how the threshold works',
        content: 'You cannot claim every dollar you spent on medical expenses. The CRA requires you to reach a minimum threshold first. For the 2024 tax year, you can only claim the portion that exceeds either 3% of your net income or $2,759, whichever is lower. For example, if your net income is $40,000, your threshold is 3% of $40,000 which is $1,200. If you spent $2,000 on dental work, you subtract $1,200 and claim the remaining $800. Verify the current threshold at canada.ca as it adjusts annually.'
      },
      {
        heading: 'The flexible 12-month rule',
        content: 'You do not have to restrict your claims to a strict calendar year. The CRA allows you to choose any 12-month period ending in the current tax year to claim your medical expenses. This is helpful if you had a large medical expense in November of one year and another in October of the following year. You can group them together in the same 12-month window to get a larger credit.'
      },
      {
        heading: 'Frequently asked questions about the medical expense tax credit',
        content: 'Do I need to send my receipts to the CRA? No. You do not attach receipts when you file, but you must keep them for six years in case the CRA asks for them later. Can I claim medical expenses paid outside Canada? Yes, if you paid for eligible expenses in another country during your 12-month claim period, you can claim them. Convert the amounts to Canadian dollars using the Bank of Canada exchange rate. What if insurance covered part of my expenses? You can only claim the portion you paid out of pocket. The amount reimbursed by insurance does not qualify.'
      }
    ],
    cta: 'Need help figuring out if your specific medical costs qualify? Ask TaxNorth — free, plain-language answers in any language.'
  },
  {
    slug: 'first-home-buyer-tax-credit-canada',
    title: 'First Home Buyers Tax Credit in Canada: Guide for Newcomers',
    metaTitle: 'First Home Buyers Tax Credit Canada: Newcomer Guide | TaxNorth',
    description: 'Buying your first home in Canada? Newcomers may qualify for up to $1,500 back through the First-Time Home Buyers Tax Credit. Learn who qualifies and how to claim.',
    intro: 'Buying your first home in Canada is an exciting milestone that comes with significant expenses. To help offset closing costs, the Canadian government offers the First-Time Home Buyers Tax Credit (HBTC). If you are a newcomer to Canada who recently purchased a qualifying home, you may be able to reduce your federal tax bill by up to $1,500.',
    sections: [
      {
        heading: 'What is the First-Time Home Buyers Tax Credit?',
        content: 'The HBTC is a non-refundable federal tax credit. When you file your taxes, you can claim a $10,000 amount on Line 31270 of your return. Because the lowest federal tax rate is 15%, this $10,000 claim translates to a direct federal tax reduction of up to $1,500. If you share the home with a spouse, you can split the claim between both returns, but the combined total cannot exceed $10,000.'
      },
      {
        heading: 'Are newcomers eligible for this credit?',
        content: 'Yes. Newcomers who are considered residents for tax purposes can claim this credit. However, there is an important rule: to be considered a first-time home buyer by the CRA, you must not have owned and lived in another home anywhere in the world in the year of purchase or in any of the four preceding calendar years. This global ownership rule catches many newcomers by surprise.'
      },
      {
        heading: 'Plain language explainer: the 4-year global rule',
        content: 'The CRA looks at your property ownership worldwide, not just in Canada. If you owned and lived in a home in your home country three years before moving to Canada, you do not qualify for this credit. You must be completely free of homeownership anywhere in the world for the four full calendar years before your purchase year to be eligible.'
      },
      {
        heading: 'What types of homes qualify?',
        content: 'Most standard residential properties qualify. This includes single-family houses, semi-detached houses, townhomes, mobile homes, and condominium units. The home must be located in Canada and officially registered in your name or your spouse\'s name. You must also intend to occupy the home as your principal place of residence within one year of purchasing it.'
      },
      {
        heading: 'Other home-buying programs newcomers should know',
        content: 'The HBTC works well alongside other programs. The First Home Savings Account (FHSA) lets you save up to $8,000 per year tax-free toward a first home purchase. The Home Buyers\' Plan (HBP) allows you to withdraw up to $60,000 from your RRSP to buy a qualifying home. If you have RRSP contribution room as a newcomer, these programs can stack to provide significant financial support.'
      },
      {
        heading: 'Frequently asked questions about the first home buyers tax credit',
        content: 'Do work permit holders qualify? Yes, as long as you are a resident of Canada for tax purposes and meet the ownership rules, your immigration status does not disqualify you. What if I previously owned a home but never lived in it? The CRA requires that you both owned and lived in the home for the 4-year rule to apply. Owning a rental property you never occupied may not disqualify you. Confirm your specific situation with the CRA or a licensed tax professional. Can I claim the credit if I bought the home late in the year? Yes. As long as the purchase closed in the calendar year, you can claim the credit on that year\'s return.'
      }
    ],
    cta: 'Buying a home changes your Canadian tax situation significantly. Ask TaxNorth for free guidance on all the credits and programs available to you as a newcomer homeowner.'
  },
  {
    slug: 'disability-tax-credit-canada',
    title: 'Disability Tax Credit in Canada: A Guide for Newcomers',
    metaTitle: 'Disability Tax Credit Canada: Guide for Newcomers | TaxNorth',
    description: 'Learn how newcomers can apply for the Disability Tax Credit in Canada. Plain-language guide to Form T2201, eligibility, and the financial support it unlocks.',
    intro: 'Living with a severe physical or mental impairment can bring significant extra costs and daily challenges. The Disability Tax Credit (DTC) is a federal program designed to reduce the income tax owed by people with disabilities or their supporting family members. Many newcomers miss this valuable credit, but being approved can unlock substantial financial support.',
    sections: [
      {
        heading: 'What is the Disability Tax Credit?',
        content: 'The Disability Tax Credit is a non-refundable tax credit that helps people with disabilities or their family members reduce the amount of federal income tax they owe each year. The goal is to provide tax relief that partially offsets the extra costs related to a severe impairment. If you are approved, you can claim the disability amount on your tax return every year for as long as the certification remains valid.'
      },
      {
        heading: 'Who is eligible for the DTC in Canada?',
        content: 'To be eligible, a person must have a severe and prolonged impairment in physical or mental functions. The CRA defines prolonged as lasting or expected to last for a continuous period of at least 12 months. The impairment must significantly restrict a basic activity of daily living such as walking, speaking, hearing, seeing, dressing, feeding, or the mental functions necessary for everyday life.'
      },
      {
        heading: 'Can newcomers apply for the Disability Tax Credit?',
        content: 'Yes. Newcomers who are residents of Canada for tax purposes can apply for the DTC. Your immigration status does not disqualify you. You will need a recognized Canadian medical practitioner to certify your condition on the CRA form. If your medical records are from your home country, share them with a Canadian doctor who can assess your condition and complete the required paperwork.'
      },
      {
        heading: 'Plain language explainer: the gateway credit',
        content: 'The Disability Tax Credit is often called a gateway credit because being approved does more than provide a tax break. It unlocks eligibility for several other major federal programs. Once approved, you may become eligible to open a Registered Disability Savings Plan (RDSP), which allows you and the government to save for your long-term financial security. You may also qualify for the Canada Caregiver Credit if a family member supports you.'
      },
      {
        heading: 'How to apply: Form T2201',
        content: 'To apply, you submit Form T2201, the Disability Tax Credit Certificate, to the CRA. You complete Part A with your personal information. Your doctor or another qualified medical practitioner completes Part B, describing your impairment and how it affects your daily activities. Submit this form to the CRA for review and approval before filing your tax return. The CRA will notify you in writing whether you are approved and for which years.'
      },
      {
        heading: 'Frequently asked questions about the Disability Tax Credit',
        content: 'Do I need to be a permanent resident to apply? No. You only need to be a resident of Canada for tax purposes filing a Canadian return. Does the condition need to be permanent? No, but it must be expected to last for at least 12 continuous months. What if I was approved but missed claiming it in past years? If your doctor certifies that your condition started in a previous year, you can request adjustments to your past tax returns and claim the credit for those years retroactively. This can result in a significant refund.'
      }
    ],
    cta: 'The Disability Tax Credit application can feel overwhelming, especially when English is not your first language. Ask TaxNorth for free, plain-language guidance in any language.'
  }
 ,{
    slug: 'employment-insurance-newcomer-canada',
    title: 'Employment Insurance for Newcomers in Canada',
    metaTitle: 'EI for Newcomers in Canada | TaxNorth',
    description: 'Wondering if newcomers to Canada can collect Employment Insurance? Learn about qualifying hours, benefit amounts, and how to apply.',
    intro: 'Losing your job can be a stressful experience, especially when you are new to Canada. Fortunately, Canada offers a safety net called Employment Insurance, or EI. If you have been working in Canada and paying into the system, you might be eligible for temporary financial support while you look for your next opportunity.',
    sections: [
      {
        heading: 'Can newcomers to Canada collect EI?',
        content: 'Newcomers to Canada, including permanent residents, work permit holders, and international students, can collect Employment Insurance regular benefits. Your immigration status does not prevent you from receiving EI, as long as you are legally allowed to work in Canada and meet the standard requirements. Whenever you work in an insurable job in Canada, your employer automatically deducts EI premiums from your paycheque. Because you have been contributing to this system, you have the same right to claim benefits as any Canadian citizen. If your work permit expires and you lose your legal right to work in Canada, you will no longer be eligible to collect EI. EI is not a handout -- it is an insurance program that you and your employer paid into during your time working in Canada.'
      },
      {
        heading: 'How many hours do you need to qualify?',
        content: 'To qualify for regular EI benefits, you need to have worked a specific number of insurable hours during your qualifying period. This period is usually the 52 weeks before you apply, or the time since your last EI claim, whichever is shorter. The number of hours required depends on the unemployment rate in your specific region at the time you apply. Generally, between 420 and 700 insurable hours are required. If you live in an area with high unemployment, you need fewer hours. If hours were spread across multiple jobs, they can be combined. Always verify current regional thresholds at canada.ca as they are updated monthly.'
      },
      {
        heading: 'How much money can you receive?',
        content: 'The amount you receive depends on how much you were earning before you lost your job. The basic rate for calculating EI benefits is 55 percent of your average insurable weekly earnings, up to a maximum. The government sets a yearly maximum insurable earnings amount that determines the absolute weekly maximum you can receive. The duration of your benefits ranges from 14 weeks up to a maximum of 45 weeks, depending on the unemployment rate in your region and your total insurable hours. Always verify current maximum amounts and thresholds at canada.ca as they are adjusted annually.'
      },
      {
        heading: 'What should you do if you lose your job?',
        content: 'If you lose your job through no fault of your own, such as a layoff or company closure, apply for EI as soon as possible. Do not wait. Submit your application online through Service Canada within four weeks of your last day of work. If you wait longer, you risk losing benefits. You will need your Social Insurance Number, personal identification, and your Record of Employment from your employer. Your employer is legally required to issue a Record of Employment when you stop working. Even if you have not received it yet, start your EI application right away and provide the document later. Delaying your application can result in lost payments.'
      },
      {
        heading: 'Frequently asked questions about EI for newcomers',
        content: 'Can international students get EI? Yes, if they meet the required insurable hours and lose their job through no fault of their own. However, you must prove you are actively seeking work, which can be difficult to prove if you are studying full-time. What happens if I quit my job? Generally you cannot collect EI regular benefits if you voluntarily quit without just cause. Do I pay taxes on EI payments? Yes. EI payments are taxable income. Service Canada will withhold taxes from your weekly payments and issue you a T4E slip at year end. Does collecting EI affect my permanent residency application? No. EI is an insurance program you paid into, not welfare. You will not be penalized by Immigration Canada for using a benefit you earned.'
      }
    ],
    cta: 'Questions about EI or how it affects your taxes? Ask TaxNorth — free answers in any language.'
  },
  {
    slug: 'childcare-expenses-tax-deduction-canada',
    title: 'Childcare Expenses Tax Deduction in Canada',
    metaTitle: 'Childcare Tax Deduction Canada | TaxNorth',
    description: 'Discover how newcomer families can claim the childcare expenses deduction in Canada. Learn 2026 limits, eligible expenses, and maximize your refund.',
    intro: 'Raising a family in Canada comes with wonderful experiences and significant costs. Daycare and after-school care can take a large portion of your monthly budget. The good news is that the Canadian government offers the childcare expenses tax deduction to help ease this financial burden. Many newcomer families miss out on this valuable deduction simply because they do not know how it works.',
    sections: [
      {
        heading: 'What is the childcare expenses tax deduction?',
        content: 'The childcare expenses deduction allows parents to deduct the cost of eligible childcare from their taxable income, claimed on Line 21400 of your tax return. Lowering your taxable income reduces the total tax you owe and often results in a larger refund. This deduction is specifically for parents who need to pay for childcare so they can work, run a business, or attend school. By lowering your net income, you might also increase your eligibility for other income-tested benefits like the Canada Child Benefit or the Canada Groceries and Essentials Benefit, making this deduction even more powerful for your household finances.'
      },
      {
        heading: 'How much can you claim?',
        content: 'The amount you can claim depends on the age and health of your children. For the 2025 and 2026 tax years, you can claim up to $8,000 for each child under seven years of age at the end of the year. For children between ages seven and sixteen, the maximum is $5,000 per child. If your child has a severe and prolonged impairment and is eligible for the Disability Tax Credit, the maximum increases to $11,000 per year. You can only claim the actual amount you paid if it is lower than the limit, and your total childcare deduction cannot exceed two-thirds of your earned income for the year. Always verify current amounts at canada.ca.'
      },
      {
        heading: 'Which parent must claim the deduction?',
        content: 'In almost all families with two parents, the spouse or common-law partner with the lower net income must claim the childcare expenses. This rule prevents high-income earners from claiming the deduction to drop into a lower tax bracket. There are rare exceptions: the higher-income spouse may claim if the lower-income spouse was enrolled in school full-time, confined to a hospital, or physically or mentally unable to care for the children. Single parents simply claim the expenses on their own return.'
      },
      {
        heading: 'What types of childcare expenses are eligible?',
        content: 'Eligible expenses include fees paid to daycare centres, nursery schools, nannies, day camps, overnight summer camps, and before-school or after-school care programs. You cannot claim regular medical expenses, clothing, or transportation costs. Payments made to the child\'s parent or to anyone under 18 who is related to you do not qualify. When paying an individual like a nanny, you must have their Social Insurance Number on the receipt. Without a valid receipt containing a business number or Social Insurance Number, the CRA will deny your deduction.'
      },
      {
        heading: 'Frequently asked questions about childcare deductions',
        content: 'Can I claim childcare expenses if I am looking for work? Yes, you can claim eligible childcare expenses if you were actively seeking employment. Does the Canada Child Benefit affect this deduction? No. The monthly CCB is entirely separate and receiving one does not stop you from claiming the other. Can I claim payments made to relatives in my home country? No. The childcare provider must be a resident of Canada and the care must be provided in Canada. Do I need to send receipts to the CRA when I file? No. You do not attach receipts when filing, but you must keep them for at least six years. The CRA frequently requests childcare receipts after filing, and without them your deduction will be reversed with interest.'
      }
    ],
    cta: 'Questions about claiming childcare or other family deductions? Ask TaxNorth — free, plain-language answers in any language.'
  },
  {
    slug: 'canada-workers-benefit-newcomers',
    title: 'The Canada Workers Benefit for Newcomers',
    metaTitle: 'Canada Workers Benefit Newcomers | TaxNorth',
    description: 'Are you a newcomer earning a modest income in Canada? You might qualify for the Canada Workers Benefit. Learn eligibility rules, amounts, and the residency catch.',
    intro: 'Working hard in a new country should pay off, and the Canadian government offers a specific tax credit to help lower-income workers get ahead. The Canada Workers Benefit (CWB) is a refundable tax credit that puts real money directly into the pockets of eligible working individuals and families. Unfortunately, many newcomers miss out on this benefit because of a strict residency rule they are not aware of.',
    sections: [
      {
        heading: 'What is the Canada Workers Benefit?',
        content: 'The Canada Workers Benefit is a refundable tax credit that provides financial relief to low-income individuals and families who are in the workforce. Because it is refundable, it can reduce your tax bill to zero and provide you with a cash refund for the remaining amount. You apply simply by filing your annual tax return and completing Schedule 6. The government also introduced Advanced Canada Workers Benefit payments, which automatically distribute up to half of your estimated benefit in three installments throughout the year, helping families manage their cash flow without waiting until tax season.'
      },
      {
        heading: 'The major catch for newcomers: the residency rule',
        content: 'There is a very specific rule that catches many newcomers off guard. To be eligible for the Canada Workers Benefit, you must be a resident of Canada throughout the entire tax year, from January 1st to December 31st. If you arrived in Canada partway through the year, you are considered a part-year resident for that first tax year and are completely ineligible to claim the CWB for your arrival year. You must wait until your first full calendar year of living and working in Canada to claim this benefit. Your spouse or common-law partner must also meet this full-year residency requirement. Once you pass December 31st and enter your next calendar year, you will be fully eligible.'
      },
      {
        heading: 'How much money can you receive?',
        content: 'The amount depends on your marital status, eligible dependants, and total income. For the 2025 and 2026 tax years, the maximum basic amount for single individuals is $1,633. For families, the maximum is $2,813. The benefit begins to gradually reduce as your income rises and phases out completely above a certain threshold. If you or your spouse is eligible for the Disability Tax Credit, you may also qualify for a disability supplement. Always verify current amounts and income thresholds at canada.ca, as they are adjusted for inflation annually.'
      },
      {
        heading: 'Are international students eligible?',
        content: 'Generally you are not eligible for the CWB if you are enrolled as a full-time student at a designated educational institution for more than 13 weeks in the year. This effectively disqualifies most full-time international students even if they are working part-time. However, there is one exception: if you are a full-time student but have an eligible dependant such as a child living with you on December 31st, you are allowed to claim the Canada Workers Benefit. This is designed to help student parents who are juggling the costs of raising a family while advancing their education.'
      },
      {
        heading: 'Frequently asked questions about the Canada Workers Benefit',
        content: 'Do I need to apply separately for the CWB? No. You apply simply by filing your annual income tax return and completing the appropriate schedule. What counts as working income? Working income includes employment income from a T4 slip and net self-employment income. Do I pay tax on the CWB money I receive? No. The Canada Workers Benefit is tax-free and you do not report it as income the following year. What happens if my income goes up next year? The CWB is based on your current tax year income. If you earn more than the threshold next year, you simply will not qualify that year. You never have to repay previous years of benefits if your income increases later.'
      }
    ],
    cta: 'Not sure if you qualify for the Canada Workers Benefit this year? Ask TaxNorth — free answers in any language.'
  }

]

export function getResource(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug)
}