// Run after GitHub Pro is active, or after the owner explicitly elects a public repo.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
const { repository } = JSON.parse(fs.readFileSync('deployment.json', 'utf8'));
function api(method, endpoint, body) {
  const result = spawnSync('gh', ['api', '--method', method, endpoint, '--input', '-'], { input: JSON.stringify(body), encoding: 'utf8' });
  if (result.status) throw new Error(result.stderr.trim() || 'GitHub configuration failed');
  return JSON.parse(result.stdout || '{}');
}
api('PUT', `repos/${repository}/branches/main/protection`, {
  required_status_checks: { strict: true, contexts: ['Validate event content'] },
  // Halona is the sole administrator and can merge owner-authored edits.
  // Staff should receive Write access, never Admin access.
  enforce_admins: false,
  required_pull_request_reviews: { dismiss_stale_reviews: true, require_code_owner_reviews: true, required_approving_review_count: 1 },
  restrictions: null, allow_force_pushes: false, allow_deletions: false, required_conversation_resolution: true
});
api('PUT', `repos/${repository}/environments/staging`, { deployment_branch_policy: null });
api('PUT', `repos/${repository}/environments/production`, {
  prevent_self_review: false,
  reviewers: [{ type: 'User', id: 28347043 }],
  deployment_branch_policy: { protected_branches: true, custom_branch_policies: false }
});
console.log('Branch review requirements and deployment environments configured. Add environment secrets before enabling deployments.');
