import { Worksheet } from '../types';

export const COMPREHENSIVE_WORKSHEETS: Worksheet[] = [
  {
    id: 'worksheet-1-flip-math',
    title: 'Worksheet 1: Malik\'s Flip Math & Financial Ledgers',
    subtitle: 'Calculating Cost Basis, Revenue, Net Profit, and ROI',
    gradeLevel: 'Grades 4-9',
    estimatedTime: '20-30 min',
    description: 'Practice the exact mathematical calculations Malik and Merrick solved in the story. Learn how to calculate gross revenue, net profit, loss, and percentage return on investment.',
    learningObjectives: [
      'Calculate Profit using the formula: Profit = Selling Price - Cost Basis',
      'Compute Return on Investment percentage: ROI % = (Net Profit / Total Cost) × 100',
      'Calculate total losses across multiple items during a market downturn',
      'Account for transaction fees, shipping, and packaging costs in real-world reselling'
    ],
    items: [
      {
        id: 'w1-q1',
        type: 'math_calc',
        prompt: 'Neon Drifters Flip Math (Part A): Malik bought 1 pair of Neon Drifters at the mall for $100. He sold them to Leo at the park for $150. What was his Net Profit?',
        subText: 'Use the formula: Net Profit = Selling Price - Purchase Price',
        correctAnswer: 50,
        unit: '$',
        stepByStepSolution: 'Selling Price ($150) - Purchase Cost ($100) = $50.00 Net Profit.',
        conceptTag: 'Net Profit'
      },
      {
        id: 'w1-q2',
        type: 'math_calc',
        prompt: 'Neon Drifters ROI (Part B): What was Malik\'s Return on Investment (ROI) percentage on the Neon Drifters?',
        subText: 'Use the formula: ROI % = (Net Profit ÷ Purchase Cost) × 100',
        correctAnswer: 50,
        unit: '%',
        stepByStepSolution: '($50 Profit ÷ $100 Cost) × 100 = 50% ROI.',
        conceptTag: 'Return on Investment'
      },
      {
        id: 'w1-q3',
        type: 'math_calc',
        prompt: 'Comet Kicks Investment (Part A): Malik bought 3 pairs of Comet Kicks online at $300 each. What was his Total Cost Basis (total money spent)?',
        subText: 'Total Cost = Number of Pairs × Price per Pair',
        correctAnswer: 900,
        unit: '$',
        stepByStepSolution: '3 pairs × $300 = $900 Total Cost Basis.',
        conceptTag: 'Cost Basis'
      },
      {
        id: 'w1-q4',
        type: 'math_calc',
        prompt: 'Comet Kicks Sale After Crash (Part B): After the surprise restock, Malik had to sell all 3 pairs at the crashed price of $100 each. How much Total Revenue did he collect from selling the 3 pairs?',
        subText: 'Total Revenue = 3 pairs × $100',
        correctAnswer: 300,
        unit: '$',
        stepByStepSolution: '3 pairs × $100 = $300 Total Revenue.',
        conceptTag: 'Total Revenue'
      },
      {
        id: 'w1-q5',
        type: 'math_calc',
        prompt: 'Comet Kicks Capital Loss (Part C): What was Malik\'s Total Financial Loss on the 3 pairs of Comet Kicks?',
        subText: 'Financial Loss = Total Cost Basis ($900) - Total Revenue ($300)',
        correctAnswer: 600,
        unit: '$',
        stepByStepSolution: 'Total Cost ($900) - Total Revenue ($300) = $600 Loss (-$600).',
        conceptTag: 'Capital Loss'
      },
      {
        id: 'w1-q6',
        type: 'multiple_choice',
        prompt: 'Net Portfolio Balance: Malik made +$50 profit on the Neon Drifters and suffered a -$600 loss on the Comet Kicks. What was his overall cumulative profit or loss across both trades?',
        options: [
          'Net Gain of +$550',
          'Net Loss of -$550',
          'Net Loss of -$650',
          'Broke even ($0)'
        ],
        correctAnswer: 'Net Loss of -$550',
        stepByStepSolution: '+$50 (Neon Drifters) + (-$600 Comet Kicks) = -$550 Net Loss overall.',
        conceptTag: 'Portfolio Balance'
      },
      {
        id: 'w1-q7',
        type: 'math_calc',
        prompt: 'Real-World Fee Calculation: Suppose Malik sells a pair of sneakers on a marketplace app for $200. The app charges a 10% platform fee ($20) and shipping costs $10. If he originally bought the shoes for $120, what is his TRUE Net Profit?',
        subText: 'True Profit = Sale Price ($200) - Purchase Price ($120) - Platform Fee ($20) - Shipping ($10)',
        correctAnswer: 50,
        unit: '$',
        stepByStepSolution: '$200 - $120 - $20 - $10 = $50 True Net Profit.',
        conceptTag: 'Transaction Fees'
      }
    ]
  },
  {
    id: 'worksheet-2-supply-demand',
    title: 'Worksheet 2: Supply, Demand & Market Equilibrium',
    subtitle: 'Understanding Scarcity, Restocks, and Price Movements',
    gradeLevel: 'Grades 4-9',
    estimatedTime: '25-35 min',
    description: 'Explore how consumer desire and manufacturer quantity determine market price. Discover why limited editions surge in value and why massive factory restocks cause prices to plummet.',
    learningObjectives: [
      'Define supply, demand, and scarcity in youth-accessible terms',
      'Predict price changes based on shifts in supply and demand curves',
      'Explain why the 1,000,000 pair surprise restock caused Comet Kicks prices to collapse',
      'Apply economic equilibrium to real-world products beyond sneakers'
    ],
    items: [
      {
        id: 'w2-q1',
        type: 'multiple_choice',
        prompt: 'When the shoe company produced only 2,000 pairs of Neon Drifters, but 10,000 students wanted them, what was the economic condition?',
        options: [
          'High Supply, Low Demand (Surplus)',
          'Low Supply, High Demand (Scarcity)',
          'High Supply, High Demand (Zero impact)',
          'Government Price Fixing'
        ],
        correctAnswer: 'Low Supply, High Demand (Scarcity)',
        stepByStepSolution: '2,000 pairs available (Low Supply) vs 10,000 buyers (High Demand) creates scarcity, driving resale prices above retail.',
        conceptTag: 'Scarcity'
      },
      {
        id: 'w2-q2',
        type: 'multiple_choice',
        prompt: 'The shoe company announced a "surprise restock of 1,000,000 pairs" of Comet Kicks. How did this action shift the market?',
        options: [
          'Supply skyrocketed while exclusivity vanished, shifting the supply curve right and crashing prices',
          'Demand increased tenfold because people only buy common shoes',
          'Prices went up because the shoe boxes became heavier',
          'The store ran out of electricity'
        ],
        correctAnswer: 'Supply skyrocketed while exclusivity vanished, shifting the supply curve right and crashing prices',
        stepByStepSolution: 'Restocking 1 million pairs flooded the market with overwhelming supply, eliminating scarcity and drastically reducing buyer willingness to pay high resale prices.',
        conceptTag: 'Supply Shock'
      },
      {
        id: 'w2-q3',
        type: 'scenario_choice',
        prompt: 'Market Prediction Challenge: A popular video game console has factory delays before the holidays (Supply is LOW) and millions of kids put it on their wish lists (Demand is HIGH). What will happen to the resale price on secondary markets?',
        options: [
          'The resale price will increase significantly above retail MSRP',
          'The resale price will drop to $5',
          'The price will remain unchanged regardless of supply',
          'Stores will pay customers to take them'
        ],
        correctAnswer: 'The resale price will increase significantly above retail MSRP',
        stepByStepSolution: 'Low supply + High seasonal demand results in intense consumer competition, driving secondary market prices upward.',
        conceptTag: 'Equilibrium Shift'
      },
      {
        id: 'w2-q4',
        type: 'short_answer',
        prompt: 'Why does a manufacturer like a shoe brand often produce limited quantities even if they know they could sell more initially?',
        subText: 'Think about brand hype, exclusivity, and customer excitement.',
        correctAnswer: 'To build brand hype, maintain exclusivity, and create massive free publicity for their other general releases.',
        stepByStepSolution: 'Limited drops generate viral social buzz, establish prestige for the brand name, and make regular models more desirable.',
        conceptTag: 'Brand Strategy'
      }
    ]
  },
  {
    id: 'worksheet-3-hype-detective',
    title: 'Worksheet 3: Hype Detective & Bubble Buster',
    subtitle: 'Distinguishing Social Media Noise from Fundamental Data',
    gradeLevel: 'Grades 4-9',
    estimatedTime: '20-30 min',
    description: 'Learn how to detect emotional hype vs. verified market data. Analyze warning signs of financial bubbles and understand why FOMO (Fear Of Missing Out) leads to risky investment decisions.',
    learningObjectives: [
      'Identify the characteristics of an Economic Bubble (rapid price escalation disconnected from utility followed by a sharp crash)',
      'Differentiate between "Emotional Investing" (FOMO) and "Data-Driven Research"',
      'Recognize key warning signals before buying an asset at peak hype',
      'Formulate objective questions to evaluate any investment opportunity'
    ],
    items: [
      {
        id: 'w3-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is an example of FOMO (Fear Of Missing Out) described in the story?',
        options: [
          'Merrick checking historical price charts on resale websites for 2 hours',
          'Malik buying 3 pairs at inflated peak prices because everyone online claimed they would triple overnight',
          'Malik working his paper route to save earnings patiently',
          'Leo negotiating a fair deal at the local park'
        ],
        correctAnswer: 'Malik buying 3 pairs at inflated peak prices because everyone online claimed they would triple overnight',
        stepByStepSolution: 'FOMO occurs when panic or greed causes an investor to ignore data and buy at inflated prices for fear of missing future gains.',
        conceptTag: 'FOMO'
      },
      {
        id: 'w3-q2',
        type: 'multiple_choice',
        prompt: 'What did Merrick mean when he told Malik: "The trend was a bubble, and bubbles always pop"?',
        options: [
          'Malik had accidentally stepped on bubble wrap in his bedroom',
          'When prices rise solely due to hype and emotions rather than scarcity, the market eventually collapses when reality sets in',
          'The shoes were filled with helium and floated away',
          'Soap bubbles are good for cleaning sneakers'
        ],
        correctAnswer: 'When prices rise solely due to hype and emotions rather than scarcity, the market eventually collapses when reality sets in',
        stepByStepSolution: 'An economic bubble occurs when speculative hype drives prices far above fundamental worth, inevitably resulting in a sharp correction.',
        conceptTag: 'Economic Bubble'
      },
      {
        id: 'w3-q3',
        type: 'multiple_choice',
        prompt: 'Which of these is a Reliable Data Signal rather than Hype?',
        options: [
          'A celebrity posting a selfie wearing the shoes with flame emojis',
          'An anonymous stranger claiming on social media that the shoe will 10x by tomorrow',
          'A 6-month historical chart showing 500 completed transactions with an average sale price of $140',
          'A rumor in a Discord chat with no verified sources'
        ],
        correctAnswer: 'A 6-month historical chart showing 500 completed transactions with an average sale price of $140',
        stepByStepSolution: 'Historical verified transaction volume and average realized prices represent objective market data.',
        conceptTag: 'Data vs Hype'
      },
      {
        id: 'w3-q4',
        type: 'scenario_choice',
        prompt: 'The Gut-Check Rule: Malik admitted that he "ignored the feeling in his gut that told him he was paying too much." What should a smart investor do when they feel uncertain about a high price?',
        options: [
          'Ignore the feeling and borrow more money to buy double',
          'Pause, review the data with a trusted partner like Merrick, and protect your cash if the risk is too high',
          'Post an angry comment online',
          'Flip a coin and buy if it lands on heads'
        ],
        correctAnswer: 'Pause, review the data with a trusted partner like Merrick, and protect your cash if the risk is too high',
        stepByStepSolution: 'Pausing to re-verify numbers and consulting a rational peer prevents impulsive, emotion-driven losses.',
        conceptTag: 'Decision Discipline'
      }
    ]
  },
  {
    id: 'worksheet-4-budget-risk',
    title: 'Worksheet 4: The Young Investor\'s Budget & Risk Blueprint',
    subtitle: 'Capital Allocation, Emergency Funds, and Never Going "All-In"',
    gradeLevel: 'Grades 4-9',
    estimatedTime: '25-35 min',
    description: 'Discover how smart entrepreneurs allocate their earnings. Learn the famous 50/30/20 budget framework, understand diversification, and build a recovery plan for Malik.',
    learningObjectives: [
      'Understand Concentration Risk: Why spending 100% of savings on one asset is dangerous',
      'Apply the 50/30/20 Budgeting Rule to youth earnings (Needs/Savings/Investments)',
      'Calculate an emergency buffer fund before making speculative flips',
      'Design a resilient capital management strategy'
    ],
    items: [
      {
        id: 'w4-q1',
        type: 'multiple_choice',
        prompt: 'What was Malik\'s biggest risk management mistake when buying the Comet Kicks?',
        options: [
          'He wore socks that didn\'t match his hoodie',
          'He went "all in," committing 100% of his profits and entire remaining savings into 3 pairs of one shoe',
          'He used a calculator with a low battery',
          'He bought the shoes from a store instead of the internet'
        ],
        correctAnswer: 'He went "all in," committing 100% of his profits and entire remaining savings into 3 pairs of one shoe',
        stepByStepSolution: 'Going all-in left Malik with zero financial cushion when the market crashed.',
        conceptTag: 'Concentration Risk'
      },
      {
        id: 'w4-q2',
        type: 'math_calc',
        prompt: 'The 50/30/20 Rule for Malik\'s Paper Route: Malik earns $200 from his paper route each month. If he follows a smart 50% Savings / 30% Spending / 20% Flipping Investment rule, how many dollars should he put into his Flipping Investment budget?',
        subText: 'Flipping Budget = $200 × 0.20',
        correctAnswer: 40,
        unit: '$',
        stepByStepSolution: '$200 × 0.20 (20%) = $40 allocated for flipping investments, keeping $160 safe in savings and essential needs.',
        conceptTag: 'Budgeting'
      },
      {
        id: 'w4-q3',
        type: 'math_calc',
        prompt: 'Diversification Math: Imagine Malik had $600. Instead of buying 2 pairs of high-risk Comet Kicks at $300 each, he divided his money: $200 in a safe savings account, $200 on low-cost shoe cleaning kits to resell for profit, and $200 on 1 sneaker drop. If the sneaker drops to $100, what is his total remaining money?',
        subText: 'Total = $200 (Savings) + $200 (Cleaning Kits) + $100 (Sneaker remaining value)',
        correctAnswer: 500,
        unit: '$',
        stepByStepSolution: '$200 (Savings) + $200 (Kits) + $100 (Sneaker) = $500 remaining. By diversifying, he only lost $100 instead of $400+!',
        conceptTag: 'Diversification'
      },
      {
        id: 'w4-q4',
        type: 'short_answer',
        prompt: 'Explain what Malik meant in the final page when he said: "The best flip isn\'t about being fast—it\'s about being smart."',
        subText: 'Write 2-3 sentences reflecting on patience, research, and long-term value.',
        correctAnswer: 'Being smart means taking time to research market facts, protect your budget, avoid emotional hype, and look for steady long-term value rather than rushing into risky get-rich-quick trends.',
        stepByStepSolution: 'Successful investing requires disciplined research and patience rather than rushed impulse buys.',
        conceptTag: 'Investing Philosophy'
      }
    ]
  },
  {
    id: 'worksheet-5-exam-certification',
    title: 'Worksheet 5: Comprehensive Mastery Exam & Certification',
    subtitle: 'Test Your Sneaker Economics Mastery & Earn Your Certificate!',
    gradeLevel: 'Grades 4-9',
    estimatedTime: '30-40 min',
    description: 'The ultimate 10-question evaluation covering all economic principles from The Sneaker Flip. Score 70% or higher to unlock and print your official Junior Sneaker Economist Certificate!',
    learningObjectives: [
      'Demonstrate mastery of Supply & Demand, Net Profit, and ROI',
      'Analyze economic bubbles, restock shocks, and market signals',
      'Apply risk management and diversification strategies',
      'Earn an official personalized completion certificate'
    ],
    items: [
      {
        id: 'w5-q1',
        type: 'multiple_choice',
        prompt: '1. What is the fundamental formula to determine Net Profit?',
        options: [
          'Net Profit = Selling Price + Cost of Goods',
          'Net Profit = Selling Price - Cost Basis - Additional Expenses',
          'Net Profit = Number of Social Media Likes ÷ 10',
          'Net Profit = Retail Price × 2'
        ],
        correctAnswer: 'Net Profit = Selling Price - Cost Basis - Additional Expenses',
        stepByStepSolution: 'Net Profit equals total revenue received minus all acquisition and transaction costs.',
        conceptTag: 'Profit Formula'
      },
      {
        id: 'w5-q2',
        type: 'multiple_choice',
        prompt: '2. Why did Leo at the park agree to pay $150 for the Neon Drifters that originally cost $100 at the mall?',
        options: [
          'He didn\'t know what money was',
          'He missed the limited retail release and was willing to pay a premium for high demand & low supply',
          'Malik forced him to buy them',
          'The shoes came with a real chest of gold'
        ],
        correctAnswer: 'He missed the limited retail release and was willing to pay a premium for high demand & low supply',
        stepByStepSolution: 'When buyers miss a scarce drop, secondary market demand pushes prices above retail MSRP.',
        conceptTag: 'Secondary Market'
      },
      {
        id: 'w5-q3',
        type: 'multiple_choice',
        prompt: '3. What happens in an economic market when Supply becomes huge (e.g. 1 million pairs restocked) while Demand stays flat or decreases?',
        options: [
          'Prices crash downward because sellers must compete for fewer buyers',
          'Prices automatically double',
          'The shoes turn invisible',
          'Every store closes permanently'
        ],
        correctAnswer: 'Prices crash downward because sellers must compete for fewer buyers',
        stepByStepSolution: 'A massive supply surplus forces sellers to lower prices to attract buyers, bursting inflated bubbles.',
        conceptTag: 'Market Oversupply'
      },
      {
        id: 'w5-q4',
        type: 'multiple_choice',
        prompt: '4. What role did Merrick play in helping Malik become a better investor?',
        options: [
          'Merrick told him to buy every shoe seen on social media',
          'Merrick taught him how to analyze historical data charts and calculate profit margins rationally',
          'Merrick hid all of Malik\'s money in a shoe box',
          'Merrick told him never to do any math'
        ],
        correctAnswer: 'Merrick taught him how to analyze historical data charts and calculate profit margins rationally',
        stepByStepSolution: 'Merrick provided objective mathematical reasoning and analytical data checking.',
        conceptTag: 'Financial Mentorship'
      },
      {
        id: 'w5-q5',
        type: 'math_calc',
        prompt: '5. Math Challenge: An investor buys 4 pairs of limited sneakers at $125 each (Total Cost = $500). They sell 2 pairs for $200 each and 2 pairs for $150 each. What is their Total Net Profit?',
        subText: 'Total Revenue = (2 × $200) + (2 × $150). Total Cost = $500.',
        correctAnswer: 200,
        unit: '$',
        stepByStepSolution: 'Total Revenue = $400 + $300 = $700. Total Cost = $500. Net Profit = $700 - $500 = $200.',
        conceptTag: 'Multi-Item Profit'
      },
      {
        id: 'w5-q6',
        type: 'multiple_choice',
        prompt: '6. What is "Concentration Risk" (Going "All-In")?',
        options: [
          'Focusing really hard while doing math homework',
          'Putting 100% of your capital into a single investment, so any drop causes severe financial damage',
          'Drinking concentrated orange juice while trading',
          'Buying shoes in only one color'
        ],
        correctAnswer: 'Putting 100% of your capital into a single investment, so any drop causes severe financial damage',
        stepByStepSolution: 'Concentration risk exposes your entire portfolio to catastrophic loss if that one investment fails.',
        conceptTag: 'Risk Management'
      },
      {
        id: 'w5-q7',
        type: 'multiple_choice',
        prompt: '7. What is the psychological trap called when an investor buys something expensive just because "everyone online is doing it"?',
        options: [
          'Diversification',
          'FOMO (Fear Of Missing Out) and Herd Mentality',
          'Compound Interest',
          'Arbitrage Strategy'
        ],
        correctAnswer: 'FOMO (Fear Of Missing Out) and Herd Mentality',
        stepByStepSolution: 'Herd mentality and FOMO drive irrational buying behavior during market bubbles.',
        conceptTag: 'Behavioral Finance'
      },
      {
        id: 'w5-q8',
        type: 'multiple_choice',
        prompt: '8. If you buy a sneaker for $200 and sell it for $250, what is your Return on Investment (ROI)?',
        options: [
          '20%',
          '25%',
          '50%',
          '10%'
        ],
        correctAnswer: '25%',
        stepByStepSolution: 'Profit = $50. ROI = ($50 ÷ $200) × 100 = 25%.',
        conceptTag: 'ROI Calculation'
      },
      {
        id: 'w5-q9',
        type: 'multiple_choice',
        prompt: '9. After Malik lost $600 on the Comet Kicks, how did he demonstrate financial resilience?',
        options: [
          'He gave up on business forever and threw away his calculator',
          'He blamed Merrick and never spoke to him again',
          'He started a notebook to track long-term value, learned from his mistake, and prepared to invest smartly',
          'He bought 10 more pairs on credit'
        ],
        correctAnswer: 'He started a notebook to track long-term value, learned from his mistake, and prepared to invest smartly',
        stepByStepSolution: 'Malik reflected on the lesson, documented market data, and adopted a disciplined, long-term approach.',
        conceptTag: 'Financial Resilience'
      },
      {
        id: 'w5-q10',
        type: 'multiple_choice',
        prompt: '10. What is the most important takeaway from "The Sneaker Flip"?',
        options: [
          'Always buy shoes endorsed by celebrities regardless of price',
          'Smart investing is based on data, disciplined budgeting, and patience—not fast hype and emotional crowds',
          'Flipping is guaranteed easy money with zero risk',
          'Math is not useful in business'
        ],
        correctAnswer: 'Smart investing is based on data, disciplined budgeting, and patience—not fast hype and emotional crowds',
        stepByStepSolution: 'Financial literacy teaches us to ground decisions in verified math, manageable risk, and emotional discipline.',
        conceptTag: 'Core Takeaway'
      }
    ]
  }
];
