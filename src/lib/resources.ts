export interface Resource {
  slug: string
  title: string
  metaTitle: string
  description: string
  intro: string
  sections: { heading: string; content: string }[]
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
        content: 'The filing deadline for most individuals is April 30. If you or your spouse are self-employed, the deadline to file is June 15, but any taxes owing must still be paid by April 30. Even if you have no income to report, filing is important — it activates your GST/HST credit, Climate Action Incentive, and other benefits you are entitled to receive.'
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
        content: 'Your employer must issue your T4 by the last day of February for the previous tax year. So for income earned in 2024, you receive your T4 by February 28, 2025. If you have not received it by then, contact your employer first. If they cannot provide it, you can request a copy through My Account on the CRA website.'
      },
      {
        heading: 'The most important boxes on your T4',
        content: 'Box 14 shows your total employment income — the full amount you earned before any deductions. Box 22 shows income tax deducted — the amount your employer withheld for taxes throughout the year. Box 16 shows your CPP contributions to the Canada Pension Plan. Box 18 shows your EI premiums paid toward Employment Insurance. Box 24 shows your EI insurable earnings. Box 26 shows your CPP pensionable earnings.'
      },
      {
        heading: 'How to use your T4 to file taxes',
        content: 'When you file your tax return, you enter the information from your T4 into your tax software or form. The amounts in Box 22 represent tax already paid — if more was withheld than you owe, you receive a refund. If less was withheld, you pay the difference. Most newcomers with a single T4 and no other income receive a refund because they also qualify for credits like the GST/HST credit and basic personal amount.'
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
    title: 'GST/HST Credit in Canada: Who is Eligible and How to Get It',
    metaTitle: 'GST/HST Credit Canada: Eligibility for Newcomers Explained | TaxNorth',
    description: 'Learn who qualifies for the GST/HST credit in Canada, how much you can receive, when payments arrive, and how to apply as a newcomer.',
    intro: 'The GST/HST credit is one of the most important — and most overlooked — benefits for newcomers to Canada. It is a tax-free quarterly payment from the government designed to help people with low and modest incomes offset the sales tax they pay. Many newcomers miss it simply because nobody told them it exists.',
    sections: [
      {
        heading: 'What is the GST/HST credit?',
        content: 'The GST/HST credit is a quarterly tax-free payment from the Canada Revenue Agency. It is designed to help individuals and families with low to moderate incomes offset the Goods and Services Tax (GST) or Harmonized Sales Tax (HST) they pay on everyday purchases. It is not a loan — it is money the government gives you.'
      },
      {
        heading: 'Who is eligible?',
        content: 'To receive the GST/HST credit you must be a Canadian resident for tax purposes, be 19 years of age or older, or have a spouse or common-law partner, or be a parent living with your child. As a newcomer, you may be eligible in the year you arrive in Canada. The amount you receive depends on your family net income and the number of children you have.'
      },
      {
        heading: 'How do you apply?',
        content: 'You do not apply separately for the GST/HST credit. The CRA automatically considers you when you file your income tax return. This is one of the most important reasons newcomers should file a tax return even if they had no income — filing is what triggers the credit.'
      },
      {
        heading: 'When do payments arrive?',
        content: 'Payments are made four times per year: in January, April, July, and October. The amount is based on your previous year\'s tax return. Set up direct deposit through My CRA Account to receive payments directly in your bank account on payment day.'
      },
      {
        heading: 'How much can you receive?',
        content: 'The amount varies based on your income, marital status, and number of children. For a single individual with no children and low income, the annual credit is typically between $300 and $500. For families with children, it can be significantly higher. The lower your income, the higher the credit.'
      }
    ],
    cta: 'Not sure if you qualify for the GST/HST credit? Ask TaxNorth — free guidance in any language.'
  },
  {
    slug: 'tax-filing-deadline-canada',
    title: 'Canadian Tax Filing Deadlines: Everything Newcomers Need to Know',
    metaTitle: 'Tax Filing Deadline Canada 2024-2025: Guide for Newcomers | TaxNorth',
    description: 'Learn the tax filing deadlines in Canada, what happens if you miss them, and why filing on time — even with no income — is critical for newcomers.',
    intro: 'Missing the tax filing deadline in Canada has real consequences — both financial penalties and lost benefits. Here is everything you need to know about when to file, what happens if you are late, and why filing early is almost always the right move.',
    sections: [
      {
        heading: 'The main filing deadline — April 30',
        content: 'For most individuals in Canada, the deadline to file your income tax return is April 30 of the year following the tax year. For example, your 2024 tax return must be filed by April 30, 2025. If April 30 falls on a weekend or holiday, the deadline moves to the next business day.'
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
        content: 'Many newcomers assume that if they had no income, they do not need to file. This is incorrect — and costly. Filing your return, even with zero income, activates your GST/HST credit, Climate Action Incentive Payment, Canada Child Benefit if you have children, and provincial benefits like the Ontario Trillium Benefit. Every year you do not file is a year you decline those payments.'
      }
    ],
    cta: 'Questions about deadlines or what to file? Ask TaxNorth — free, instant answers in your language.'
  },
  {
    slug: 'international-student-taxes-canada',
    title: 'How International Students File Taxes in Canada',
    metaTitle: 'International Student Taxes Canada: Complete Filing Guide | TaxNorth',
    description: 'Everything international students need to know about filing taxes in Canada — residency status, tuition credits, T4 slips, GST/HST eligibility, and free filing options.',
    intro: 'If you are an international student in Canada, you likely need to file a Canadian tax return — and doing so can put money back in your pocket through the tuition tax credit and GST/HST credit. Here is everything you need to know.',
    sections: [
      {
        heading: 'Are international students required to file taxes in Canada?',
        content: 'If you lived in Canada for more than 183 days in a calendar year, you are generally considered a Canadian resident for tax purposes and should file a tax return. This applies to most international students. Even if you had no income, filing is worthwhile because it makes you eligible for the GST/HST credit and builds your RRSP contribution room for future years.'
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
        heading: 'GST/HST credit eligibility for students',
        content: 'International students who are Canadian residents for tax purposes are eligible for the GST/HST credit. Even if you had no employment income, filing your return makes you eligible for this quarterly payment. The amount depends on your income — lower income means higher credit.'
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
        content: 'Work permit holders who are Canadian residents for tax purposes are eligible for most federal benefits including the GST/HST credit, Canada Workers Benefit, and Climate Action Incentive Payment. If you have children, you may also be eligible for the Canada Child Benefit. These benefits are activated by filing your tax return.'
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
        content: 'The Canada Child Benefit (CCB) is a tax-free monthly payment made to eligible families to help with the cost of raising children under 18 years of age. Unlike older child benefit programs, the CCB is targeted — families with lower incomes receive higher payments. It is not taxable income.'
      },
      {
        heading: 'Who is eligible as a newcomer?',
        content: 'To receive the Canada Child Benefit, you must be a Canadian resident for tax purposes and be primarily responsible for the care and upbringing of a child under 18. For newcomers specifically, you can apply once you have lived in Canada for 18 months and hold a valid permit in the 19th month, or once you become a Canadian citizen or permanent resident. Work permit holders and protected persons are eligible.'
      },
      {
        heading: 'How much can you receive?',
        content: 'The amount depends on your family net income and the ages of your children. For a family with one child under 6 and a family net income below a certain threshold, the annual benefit can exceed $7,000. Payments are recalculated every July based on your previous year\'s tax return. The lower your income, the higher your benefit.'
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
  }
]

export function getResource(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug)
}