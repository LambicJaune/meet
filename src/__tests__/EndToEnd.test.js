import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .description');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});

describe('filter events by city', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        await page.reload(); // Reset to clean state before each test
        await page.waitForSelector('.event');
    });

    test('When user hasn’t searched for a specific city, show upcoming events from all cities', async () => {
        const eventLocations = await page.$$eval('.event', events =>
            events.map(event => event.textContent)
        );

        expect(eventLocations.length).toBeGreaterThan(1); // Assumes multiple cities/events are shown by default
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.click('.city');
        await page.type('.city', 'Berlin');

        // Wait for the suggestion list to appear
        await page.waitForSelector('.suggestions li');

        const suggestions = await page.$$eval('.suggestions li', items =>
            items.map(item => item.textContent)
        );

        // Assert suggestions include "Berlin"
        const berlinSuggestions = suggestions.filter(item =>
            item.toLowerCase().includes('berlin')
        );
        expect(berlinSuggestions.length).toBeGreaterThan(0);
    });

    test('User can select a city from the suggested list', async () => {
        await page.click('.city');
        await page.type('.city', 'Berlin');

        // Wait for suggestions to load
        await page.waitForSelector('.suggestions li');

        // Click on the first suggestion that includes "Berlin"
        const berlinSelector = await page.$x("//li[contains(text(), 'Berlin')]");
        if (berlinSelector.length > 0) {
            await berlinSelector[0].click();
        }

        // Wait for the filtered event list to render
        await page.waitForSelector('.event');

        const visibleLocations = await page.$$eval('.event', events =>
            events.map(event => event.textContent)
        );

        // All events should be in Berlin
        for (const locationText of visibleLocations) {
            expect(locationText).toMatch(/Berlin/i);
        }
    });
});