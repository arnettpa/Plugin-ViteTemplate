import bodyParser from 'body-parser';
import { Router } from 'express';
import { Chalk } from 'chalk';

// TypeScript contract for plugin exports
interface PluginInfo {
    id: string;
    name: string;
    description: string;
}

interface Plugin {
    init: (router: Router) => Promise<void>;
    exit: () => Promise<void>;
    info: PluginInfo;
}

const chalk = new Chalk();
const MODULE_NAME = '[SillyTavern-Vite-Example-Plugin]';

// You can register routes via the router that will be registered under the /api/plugins/{id}/{route} path.

/**
 * Initialize the plugin.
 * @param router Express Router
 */
export async function init(router: Router): Promise<void> {
    const jsonParser = bodyParser.json();
    // Used to check if the server plugin is running
    router.post('/probe', (_req, res) => {
        return res.sendStatus(204);
    });
    // Use body-parser to parse the request body
    router.post('/ping', jsonParser, async (req, res) => {
        try {
            const { message } = req.body;
            console.log(chalk.green(MODULE_NAME), `vite-example /ping: ${message}`);
            return res.json({ message: `Pong! ${message}` });
        } catch (error) {
            console.error(chalk.red(MODULE_NAME), 'Request failed', error);
            return res.status(500).send('Internal Server Error');
        }
    });

    console.log(chalk.green(MODULE_NAME), 'vite-example Plugin loaded!');
}

export async function exit(): Promise<void> {
    console.log(chalk.yellow(MODULE_NAME), 'vite-example Plugin exited');
}

export const info: PluginInfo = {
    id: 'vite-example',
    name: 'Example Plugin',
    description: 'A simple example plugin for SillyTavern server.',
};

const plugin: Plugin = {
    init,
    exit,
    info,
};

export default plugin;
