const { Client } = require('@notionhq/client');

// Initialize a new Notion API client with an integration token
const notion = new Client({ auth: 'secret_TxZiy9dCzzdOouokBZD5Uty7eOVdAdvQVoLiwRYraYA' });

// Define the database ID for the page you want to create
const databaseId = '49a66d6b23b84184b9b0c93258c7a756';

// Define the title of the new page
const pageTitle = 'Shopping List 2.19';

// Define the list of items with their corresponding quantities, replacing tabs with ", "
const items = [
  'Old-fashioned oats, 7 cups',
  'Natural peanut butter, 1 jar',
  'Almond milk (no sugar added), 112 fl oz (7 containers)',
  'Chicken breast, 5.25 lbs',
  'Brown rice, 7 cups',
  'Green beans, 4 cups',
  'Brussels sprouts, 2 cups',
  'Carrots, 4 cups',
  'Common mushrooms, 2 cups',
  'Spinach, 2 cups',
  'Capsicum (any flavor), 4 cups',
  'Sweet potato, 3 cups',
  'Red onion, 1.25 cups',
  'Garlic, 10 cloves',
  'Shallot, 1',
  'Broccoli, 2 cups',
  'Mung bean sprouts, 2 cups',
  'Cauliflower, 2 cups',
  'Asparagus, 2 cups',
  'Zucchini, 3 cups',
  'Poblano peppers, 2 cups',
  'Black beans, 2 cups',
  'Greek yogurt, 2 cups',
  'Mixed berries, 1 cup',
  'Honey, 1/4 cup',
  'Cottage cheese, 1 cup',
  'Mixed nuts, 2/3 cup',
  'Apple, 1',
  'Almond butter, 2 Tbsp',
  'Hummus, 1/2 cup',
  'Baby carrots, 1 cup',
  'Protein bar, 1',
  'Protein shake (whey protein, almond milk), 2 servings'
];

// Create a new page in the specified database with to-do blocks containing the shopping list items
async function createPage() {
  try {
    // Create a new page with the specified title in the root of your Notion account
    const newPage = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [{ text: { content: pageTitle } }]
      }
    });

    // Define the new page ID
    const newPageId = newPage.id;

    // Loop through the list of items and add each one as a to-do block on the new page
    for (const item of items) {
      await notion.blocks.children.append({
        block_id: newPageId,
        children: [
          {
            object: 'block',
            type: 'to_do',
            to_do: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: item
                  }
                }
              ]
            }
          }
        ]
      });
    }

    console.log(`New page "${pageTitle}" created successfully with a to-do list!`);
  } catch (error) {
    console.error(error.body);
  }
}

createPage();