import fs from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
const environment = process.argv[2];
if (!['staging', 'production'].includes(environment)) throw new Error('Choose staging or production.');
const settings = JSON.parse(await fs.readFile('deployment.json', 'utf8'));
if (environment === 'production') {
  if (process.env.GITHUB_ACTIONS !== 'true' || process.env.PRODUCTION_APPROVED !== 'true' || process.env.GITHUB_REF !== 'refs/heads/main') throw new Error('Production deploys run only through the approved GitHub production environment on main.');
}
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'royal-duck-deploy-'));
const resultPath = path.join(temporary, 'wrangler.jsonl');
const executable = path.resolve('node_modules/.bin/wrangler');
const args = ['deploy', '--config', `wrangler.${environment}.jsonc`];
const result = spawnSync(executable, args, { stdio: 'inherit', env: { ...process.env, WRANGLER_OUTPUT_FILE_PATH: resultPath } });
if (result.status !== 0) process.exit(result.status || 1);
const records = (await fs.readFile(resultPath, 'utf8')).trim().split('\n').map(line => JSON.parse(line));
const deployment = records.findLast(record => record.type === 'deploy');
if (!deployment) throw new Error('Wrangler did not report a deployment.');
const url = environment === 'staging' ? settings.adminOrigin : settings.productionOrigin;
if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `url=${url}\nversion=${deployment.version_id || deployment.versionId || ''}\n`);
console.log(`${environment} deployed: ${url}`);
