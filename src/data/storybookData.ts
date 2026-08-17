import { StoryPage } from '../types';

export const STORYBOOK_PAGES: StoryPage[] = [
  {
    pageNumber: 1,
    title: "The Sneaker Flip: Lesson on Financial Literacy",
    narrative: "Malik and Merrick explore the world of sneaker economics. Behind every limited-edition shoe drop lies a marketplace driven by supply, demand, market hype, and financial risk.",
    illustrationDescription: "Malik and Merrick sitting at a desk with charts showing 'Supply, Demand, Hype Risk', shoeboxes stacked high, and a laptop analyzing sneaker market economics.",
    theme: "intro",
    economicConcept: "Market Economics & Financial Literacy",
    merricksNote: "Before spending a single dollar, smart investors understand the market system. Let's explore how prices are set!",
    vocabulary: [
      { word: "Financial Literacy", definition: "The ability to understand and effectively use financial skills like budgeting, investing, and profit calculation." },
      { word: "Market Economics", definition: "A system where the prices of goods and services are determined by the open market and consumer demand." }
    ]
  },
  {
    pageNumber: 2,
    title: "The Dream of the Flip",
    narrative: "Malik lived in a world where shoes weren't just for walking; they were for winning. He spent his afternoons scrolling through the 'Drop Clock' app, watching the seconds tick down until the newest, rarest sneakers hit the shelves.\n\nMalik didn't just want to wear them; he wanted to be a 'flipper'—someone who buys high-demand items to sell them for a profit. He dreamed of turning his small savings into a mountain of cash, one shoebox at a time.",
    illustrationDescription: "Malik sitting on his bed scrolling through the Drop Clock countdown on his phone, surrounded by shoe boxes and retro posters.",
    theme: "intro",
    economicConcept: "Entrepreneurship & Reselling",
    merricksNote: "A 'flipper' is an entrepreneur who spots an arbitrage opportunity—buying an item at retail and selling it to someone willing to pay more.",
    vocabulary: [
      { word: "Flipper", definition: "A person who buys high-demand goods with the goal of quickly reselling them for a profit." },
      { word: "Profit", definition: "The money you gain after subtracting the original cost from what you sold it for (Selling Price - Cost = Profit)." }
    ],
    quizQuestion: {
      question: "What is the primary financial goal of a sneaker flipper like Malik?",
      options: [
        "Collect as many shoes as possible to wear them all",
        "Buy high-demand items and sell them for more than the purchase price",
        "Give shoes away for free to friends",
        "Manufacture shoes in a local factory"
      ],
      correctIndex: 1,
      explanation: "Flippers aim to buy at retail (or low cost) and sell at resale market value to earn a net profit."
    }
  },
  {
    pageNumber: 3,
    title: "Teaming Up with the Math Whiz",
    narrative: "Malik knew he couldn't do it alone. He teamed up with his best friend, Merrick, who was a total math whiz. They spent hours at the library looking at 'resale' websites.\n\nMerrick showed Malik how to track the history of shoe prices. 'You can't just buy what looks cool, Malik,' Merrick warned, tapping a laptop screen. 'You have to look at the data. If the price is already too high, there's no room for us to make money.'",
    illustrationDescription: "Malik and Merrick at the library with a calculator, coffee mug, and laptop analyzing historical price chart graphs.",
    theme: "research",
    economicConcept: "Data-Driven Market Research",
    merricksNote: "Emotions make you overspend; data keeps you safe! Always check past sales history before committing your savings.",
    vocabulary: [
      { word: "Market Research", definition: "Gathering information about consumers' needs, past sales, and pricing trends." },
      { word: "Price Ceiling", definition: "The highest price buyers are realistically willing to pay for an item." }
    ],
    quizQuestion: {
      question: "Why did Merrick tell Malik to check historical price data instead of just what looks cool?",
      options: [
        "Because cool shoes are always illegal to sell",
        "If you buy when the price is already peaked, there's no profit margin left",
        "Calculators don't work on cool shoes",
        "Only ugly shoes make money in economics"
      ],
      correctIndex: 1,
      explanation: "If you pay an inflated price, there is little to no room for resale profit margin, increasing your financial risk."
    }
  },
  {
    pageNumber: 4,
    title: "The Law of Supply and Demand",
    narrative: "'It's all about Supply and Demand,' Malik explained to Merrick the next day. He drew a diagram on a napkin.\n\n'Supply is how many shoes the company makes. Demand is how many people want to buy them. If the supply is low and the demand is high, the price goes up! That's our window.' Malik felt like a professional trader, ready to make his first big move in the market.",
    illustrationDescription: "Malik standing up explaining Supply & Demand with a napkin diagram and calculator on a desk labeled Market Strategy.",
    theme: "strategy",
    economicConcept: "Supply & Demand Equilibrium",
    merricksNote: "Scarcity creates value! When something is rare (low supply) and widely desired (high demand), buyers will compete by offering higher prices.",
    vocabulary: [
      { word: "Supply", definition: "The total amount of a specific product available to buyers." },
      { word: "Demand", definition: "The desire of consumers to buy a product and their willingness to pay for it." },
      { word: "Scarcity", definition: "The basic economic problem of having limited supply to satisfy unlimited desires." }
    ],
    quizQuestion: {
      question: "What happens to the market price when supply is LOW and demand is HIGH?",
      options: [
        "The price goes down",
        "The price goes up",
        "The price stays exactly zero",
        "The company destroys the shoes"
      ],
      correctIndex: 1,
      explanation: "When many people want something that has limited quantities, competition pushes the market price higher."
    }
  },
  {
    pageNumber: 5,
    title: "Patience and the First Drop",
    narrative: "After months of saving money from his paper route, the day finally arrived. Malik stood in a long line at the mall for four hours.\n\nWhen he finally reached the counter, he bought a pair of 'Neon Drifters.' They were bright green, limited edition, and everyone was talking about them. As he walked out of the store holding the heavy cardboard box, Malik felt like he was carrying a chest of gold.",
    illustrationDescription: "Malik walking proudly out of the 'Sneaker District' store at the mall holding his shoebox of limited edition Neon Drifters.",
    theme: "line",
    economicConcept: "Savings, Capital & Opportunity Cost",
    merricksNote: "Malik earned his starting capital through hard work on a paper route. Saving takes patience, but it gave him the capital to invest.",
    vocabulary: [
      { word: "Starting Capital", definition: "The initial money used to start a business or purchase inventory." },
      { word: "Limited Edition", definition: "A product produced in small quantities to increase exclusivity and demand." }
    ],
    quizQuestion: {
      question: "Where did Malik get the money to buy his first pair of Neon Drifters?",
      options: [
        "He took out a bank loan with interest",
        "He saved earnings from his paper route over several months",
        "He found the money on the street",
        "Merrick paid for everything"
      ],
      correctIndex: 1,
      explanation: "Saving his earned income provided Malik with the investment capital needed for his first venture."
    }
  },
  {
    pageNumber: 6,
    title: "The First Big Win",
    narrative: "The plan worked perfectly. A few days later, Malik met a student named Leo at the local park. Leo had missed the store release and was desperate for the Neon Drifters.\n\nAfter a quick negotiation, Leo paid Malik nearly double the original retail price. Malik handed over the box, his heart racing. He had just made his first fifty dollars of pure profit. He felt unstoppable.",
    illustrationDescription: "Malik meeting Leo at the park, exchanging the Neon Drifters shoebox for cash bills.",
    theme: "flip_success",
    economicConcept: "Net Profit & Return on Investment (ROI)",
    merricksNote: "Math Check: If retail was $100 and Leo paid $150, Malik earned $50 in profit! That's a 50% Return on Investment (ROI).",
    vocabulary: [
      { word: "Net Profit", definition: "The actual gain after all expenses are subtracted (Revenue - Expenses = Net Profit)." },
      { word: "Return on Investment (ROI)", definition: "A measure used to evaluate the efficiency or profitability of an investment ((Profit / Cost) x 100%)." }
    ],
    quizQuestion: {
      question: "If Malik bought the shoes for $100 and sold them for $150, what was his net profit?",
      options: [
        "$150",
        "$100",
        "$50",
        "$250"
      ],
      correctIndex: 2,
      explanation: "$150 sale price minus $100 purchase cost = $50 pure profit!"
    }
  },
  {
    pageNumber: 7,
    title: "The Hype Trap: The Comet Kick",
    narrative: "Soon, the internet began to buzz about a new shoe: 'The Comet Kick.' Every celebrity was wearing them, and every social media post was about them.\n\nThe 'hype' was unlike anything Malik had ever seen. People were saying these shoes would triple in value overnight. Malik stopped looking at the price charts and started listening to the noise. He didn't want to miss the biggest trend of the year.",
    illustrationDescription: "Malik in the city looking up at a massive glowing billboard of 'The Comet Kick' while phone notifications buzz with social media hype.",
    theme: "hype",
    economicConcept: "Hype, Social Proof & FOMO",
    merricksNote: "Warning flag! FOMO (Fear Of Missing Out) causes people to abandon logic, skip math, and buy near the market peak.",
    vocabulary: [
      { word: "Market Hype", definition: "Intense publicity, excitement, or exaggeration promoting an item, often inflating perceived value." },
      { word: "FOMO", definition: "Fear Of Missing Out—an anxious feeling that others are making money or having fun without you." }
    ],
    quizQuestion: {
      question: "What mistake did Malik start making when he heard about the Comet Kick?",
      options: [
        "He stopped checking data charts and started listening to social media hype",
        "He deleted all his apps and stopped wearing shoes",
        "He asked Merrick to do triple the calculations",
        "He bought shoes only for basketball practice"
      ],
      correctIndex: 0,
      explanation: "Malik let social media hype and fear of missing out replace disciplined data research."
    }
  },
  {
    pageNumber: 8,
    title: "Going 'All In'",
    narrative: "Malik decided to go 'all in.' He took all the profit from his first flip, plus every cent of his remaining savings. He didn't wait in line this time; he bought three pairs of Comet Kicks from a stranger online at a very high price.\n\nHe was sure that the demand would keep growing and he would become rich. He ignored the feeling in his gut that told him he was paying too much.",
    illustrationDescription: "Malik in his bedroom anxiously counting bills, surrounded by 3 pairs of Comet Kicks bought at peak resale prices.",
    theme: "all_in",
    economicConcept: "Risk Management & Lack of Diversification",
    merricksNote: "Rule #1 of Investing: Never put all your eggs in one basket! Spending 100% of your savings removes your safety cushion.",
    vocabulary: [
      { word: "All-In / Concentration Risk", definition: "Investing all your available money into a single asset, leaving you vulnerable to catastrophic loss." },
      { word: "Cost Basis", definition: "The original price paid for an asset (Malik paid $300 per pair = $900 total cost basis)." }
    ],
    quizQuestion: {
      question: "Why is going 'all in' with 100% of your savings a dangerous financial move?",
      options: [
        "Banks will confiscate your shoeboxes",
        "If the price drops, you have no emergency fund or money left to recover",
        "It makes math too easy to calculate",
        "Shoes lose color if you buy more than two"
      ],
      correctIndex: 1,
      explanation: "Concentration risk leaves you with no emergency cushion if market conditions suddenly change."
    }
  },
  {
    pageNumber: 9,
    title: "The Bubble Bursts: The Surprise Restock",
    narrative: "Two days later, the 'hype bubble' burst. The shoe company realized how popular the Comet Kicks were and decided to make more. They announced a 'surprise restock' of a million pairs.\n\nSuddenly, the shoes weren't rare anymore. The supply had skyrocketed, and the demand vanished instantly. Malik checked the resale apps and saw the price crashing. His 'investment' was losing value by the minute.",
    illustrationDescription: "Malik staring in shock at a store window poster announcing a massive 1,000,000 pair restock as prices plummet on his phone.",
    theme: "restock_crash",
    economicConcept: "Economic Bubbles & Oversupply",
    merricksNote: "When the company produced 1,000,000 new pairs, scarcity was destroyed. High supply + declining demand = price crash!",
    vocabulary: [
      { word: "Economic Bubble", definition: "When the price of an item surges far beyond its real value due to hype, before rapidly crashing." },
      { word: "Restock / Oversupply", definition: "A sudden influx of new inventory that floods the market, driving down prices." }
    ],
    quizQuestion: {
      question: "Why did the resale price of Comet Kicks crash overnight?",
      options: [
        "The shoes were made of chocolate and melted",
        "The company released a million pairs, skyrocketing supply and eliminating scarcity",
        "The mall closed down forever",
        "People forgot how to tie shoelaces"
      ],
      correctIndex: 1,
      explanation: "A massive restock flooded the market with supply, destroying the scarcity that supported high prices."
    }
  },
  {
    pageNumber: 10,
    title: "Facing the Loss",
    narrative: "Malik sat in his room, surrounded by boxes he couldn't sell. He had paid three hundred dollars for shoes that were now only worth one hundred. Merrick came over and sat on the floor next to him.\n\n'I got caught up in the hype,' Malik sighed. Merrick nodded. 'It happens to the best investors. You bought based on a feeling, not on the facts. The trend was a bubble, and bubbles always pop.'",
    illustrationDescription: "Malik sitting on his bedroom floor with his head in his hands, with Merrick sitting next to him offering encouragement and support.",
    theme: "sad_lesson",
    economicConcept: "Unrealized vs. Realized Loss",
    merricksNote: "Malik paid $300 each ($900 total) for shoes now worth $100 each ($300 total). That's a -$600 loss ($200 loss per pair).",
    vocabulary: [
      { word: "Capital Loss", definition: "A decrease in the value of an investment where the selling price is lower than the purchase price." },
      { word: "Emotional Investing", definition: "Making financial choices based on excitement, fear, or greed rather than financial analysis." }
    ],
    quizQuestion: {
      question: "If Malik paid $300 each for 3 pairs ($900 total) and they are now worth $100 each ($300 total), what is his total loss?",
      options: [
        "$300 loss",
        "$600 loss",
        "$900 loss",
        "$0 (no loss)"
      ],
      correctIndex: 1,
      explanation: "$900 invested minus $300 current value = a $600 financial loss."
    }
  },
  {
    pageNumber: 11,
    title: "Starting Again the Right Way",
    narrative: "Malik ended up selling the shoes at a loss, but he gained a valuable lesson. He realized that real market research is better than following a crowd.\n\nHe started a new notebook, tracking long-term value instead of short-term hype. He still loves sneakers, but now he knows that the best flip isn't about being fast—it's about being smart. He looks at his charts, ready to start again, the right way.",
    illustrationDescription: "Malik smiling at his desk with a laptop displaying price trend charts, taking notes in a new research notebook, ready to invest wisely.",
    theme: "smart_rebound",
    economicConcept: "Long-Term Value & Resilience",
    merricksNote: "Mistakes are tuition in the school of economics! Malik learned to prioritize disciplined research and risk control.",
    vocabulary: [
      { word: "Long-Term Value", definition: "The enduring worth of an asset based on fundamentals rather than temporary trends." },
      { word: "Financial Resilience", definition: "The ability to recover from monetary losses and adapt with improved strategies." }
    ],
    quizQuestion: {
      question: "What is Malik's new investing motto at the end of the story?",
      options: [
        "The best flip is about being fast and noisy",
        "The best flip isn't about being fast—it's about being smart",
        "Never save money from a paper route",
        "Always spend all savings on celebrity shoes"
      ],
      correctIndex: 1,
      explanation: "Malik learned that disciplined research and smart risk management outperform impulsive speed."
    }
  },
  {
    pageNumber: 12,
    title: "Educator & Caregiver Guide: Core Concepts",
    narrative: "Thank you for inspiring the next generation of smart investors!\n\nBy following Malik and Merrick's journey through sneaker economics, students discover how real markets operate beyond the hype.\n\nCore Concepts Practiced:\n• Supply & Demand: How scarcity drives prices\n• Market Strategy & Hype: Data tracking vs. social media hype\n• The Economic Bubble: Why restocks cause oversupply crashes\n• Risk vs. Research: Long-term value over short-term trends",
    illustrationDescription: "Malik and Merrick using pointer sticks to teach on a 3D miniature city model of sneaker economics with happy confident expressions.",
    theme: "educator_guide",
    economicConcept: "Curriculum Summary & Mastery",
    merricksNote: "Ready to test your knowledge? Head over to the Worksheets Suite to solve real math problems, plot market curves, and earn your Junior Economist Certificate!",
    vocabulary: [
      { word: "Arbitrage", definition: "Simultaneously buying in one market at a lower price and selling in another at a higher price." },
      { word: "Diversification", definition: "A risk management strategy that mixes a variety of investments within a portfolio." }
    ]
  }
];
