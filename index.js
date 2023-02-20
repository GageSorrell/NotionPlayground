const { Client } = require('@notionhq/client');

exports.handler = async (event, context) => {
    // Get the Supplement and Dose values from the event
    //   const { Supplement, Dose } = JSON.parse(event.body);
    const RelevantBody = JSON.parse(event.body);
    const SupplementInput = RelevantBody.Supplement;
    const Dose = Number(RelevantBody.Dose);

    const now = new Date();

    // Get the time zone offset for Fort Wayne, Indiana
    const tzOffset = -240; // UTC-4

    // Add the offset to the current time
    const fwTime = new Date(now.getTime() + tzOffset * 60 * 1000);

    // Format the time as an ISO string
    const isoString = fwTime.toISOString();


    // Initialize the Notion client
    const notion = new Client({ auth: "secret_TxZiy9dCzzdOouokBZD5Uty7eOVdAdvQVoLiwRYraYA" });

    // Find the database with the Select property
    const databaseId = "aee857ac88c543f38d8d4971169e36c9";
    const database = await notion.databases.retrieve({ database_id: databaseId });

    // Find the option corresponding to the provided supplement value
    console.log(database.properties);
    const supplementOption = database.properties.Supplement.select.options.find(option => option.name === SupplementInput);

    console.log("SupplementOption ID was " + supplementOption.id);
    // Create a new page in the database with the specified properties
    const newPage = {
        "Supplement":
        {
            "select":
            {
                "name": SupplementInput
            }
        },
        "Dose (mg)": {
            number: Dose
        },
        Time:
        {
            date:
            {
                start: isoString
            }
        },
        "Name": { title: [{ text: { content: "" } }] }
    };
    await notion.pages.create({ parent: { database_id: databaseId }, properties: newPage });

    // Return a success response
    return {
        statusCode: 200,
        body: "Page created successfully"
    };
};