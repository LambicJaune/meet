'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://meet-beta-rosy.vercel.app/"];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
);

// Helper to include CORS headers
const createResponse = (statusCode, body) => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
    },
    body: JSON.stringify(body),
});

// Generic OPTIONS handler
module.exports.options = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
        },
        body: '',
    };
};

// Endpoint: Get OAuth URL
module.exports.getAuthURL = async () => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    return createResponse(200, { authUrl });
};

// Endpoint: Exchange code for access token
module.exports.getAccessToken = async (event) => {
    const code = decodeURIComponent(`${event.pathParameters.code}`);

    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (error, response) => {
            if (error) return reject(error);
            resolve(response);
        });
    })
    .then(results => createResponse(200, results.tokens))
    .catch(error => createResponse(500, { message: error.message || error }));
};

// Endpoint: Get calendar events
module.exports.getCalendarEvents = async (event) => {
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) reject(error);
                else resolve(response);
            }
        );
    })
    .then(results => createResponse(200, { events: results.data.items }))
    .catch(error => createResponse(500, { message: error.message || error }));
};
