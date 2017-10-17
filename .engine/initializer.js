const fs = require('fs');

const firebaseConfig = `{
    "database": {
        "rules": "database.rules.json"
    },
    "hosting": {
        "public": "public",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [{
            "source": "**",
            "function": "app"
        }],
        "headers": [{
            "source": "**/*.@(js|css|jpg|jpeg|gif|png)",
            "headers": [{
                "key": "Cache-Control",
                "value": "public, max-age=31536000, s-maxage=31536000"
            }]
        }]
    }
}
`;

fs.writeFile('../firebase.json', firebaseConfig, 'utf8', (err) => {
    if (err) {
        console.warn('Error while initializing project. Please try again.');
    }
});
