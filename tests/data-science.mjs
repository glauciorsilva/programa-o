import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../public/js/dados-pratica.js', import.meta.url), 'utf8');
const content = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
assert.equal(content.LABS.length, 4);
assert.equal(content.EXERCISES.length, 10);
assert.equal(new Set(content.EXERCISES.map(x => x.id)).size, 10);
assert.match(content.practiceCards({ dsx_array: true }), /1 de 10 resolvidos/);
assert.match(content.practiceCards(), /lang="en"/);
assert.match(content.practiceCards(), /lang="pt-BR"/);

const payload = JSON.stringify({ files: content.FILES, exercises: content.EXERCISES, labs: content.LABS });
const script = String.raw`
import json, sys, tempfile, os, io, base64
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
data=json.load(sys.stdin)
with tempfile.TemporaryDirectory() as root:
    os.chdir(root)
    def reset_files():
        for name, text in data['files'].items():
            Path(name).write_text(text, encoding='utf-8')
    for ex in data['exercises']:
        reset_files()
        plt.close('all')
        scope={}
        exec(compile(ex['solution'], ex['id']+'.py', 'exec'), scope)
        exec(compile(ex['test'], ex['id']+'_test.py', 'exec'), scope)
        # Wrong outputs must fail, even if prerequisite imports and variables exist.
        wrong=dict(scope)
        replacements={'array':{'average':0},'mask':{'selected':[]},'revenue':{'total_revenue':0},
            'filter':{'selected':scope.get('df')},'clean':{'clean':scope.get('df')},
            'group':{'totals':None},'join':{'joined':scope.get('orders')},
            'json':{'counts':None},'stats':{'mean_value':0}}
        if ex['id']=='chart':
            scope['ax'].set_ylabel('wrong')
        else:
            wrong.update(replacements[ex['id']])
        try:
            exec(ex['test'], wrong)
        except (AssertionError, AttributeError, KeyError, TypeError):
            pass
        else:
            raise AssertionError('Incorrect answer accepted: '+ex['id'])
        print('PASS exercise:',ex['id'])
    for lab in data['labs']:
        if lab['id']=='api':
            compile(lab['code'], 'api.py', 'exec', flags=__import__('ast').PyCF_ALLOW_TOP_LEVEL_AWAIT)
            continue
        reset_files()
        plt.close('all')
        exec(lab['code'], {})
        if lab['id']=='charts':
            assert len(plt.get_fignums())==1
            buffer=io.BytesIO()
            plt.gcf().savefig(buffer,format='png',dpi=100)
            assert buffer.getvalue().startswith(b'\x89PNG')
            assert len(base64.b64encode(buffer.getvalue()))>1000
        print('PASS lab:',lab['id'])
print('PASS all solutions, negative checks, local labs and API syntax')
`;
const result = spawnSync(process.env.PYTHON || 'python', ['-c', script], {
  input: payload, encoding: 'utf8', env: { ...process.env, MPLBACKEND: 'Agg' }, maxBuffer: 4_000_000
});
process.stdout.write(result.stdout || '');
process.stderr.write(result.stderr || '');
if (result.error) throw result.error;
assert.equal(result.status, 0, 'Python practice verification failed');
