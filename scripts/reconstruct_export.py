from pathlib import Path
import shutil, json

src = Path('raw-export')
root = Path('.')

for name in ['package.json','postcss.config.js','tailwind.config.js','components.json','jsconfig.json','eslint.config.js','.gitignore']:
    shutil.copy2(src / name, root / name)

(root / 'base44/entities').mkdir(parents=True, exist_ok=True)
for name in ['TechGuide.jsonc','Glossary.jsonc','Board.jsonc','Item.jsonc']:
    shutil.copy2(src / name, root / 'base44/entities' / name)
shutil.copy2(src / 'config.jsonc', root / 'base44/config.jsonc')

(root / 'src').mkdir(exist_ok=True)
for name in ['App.jsx','Layout.jsx','pages.config.js','main.jsx','index.css']:
    shutil.copy2(src / name, root / 'src' / name)

(root / 'src/lib').mkdir(parents=True, exist_ok=True)
for name in ['AuthContext.jsx','NavigationTracker.jsx','PageNotFound.jsx','query-client.js','app-params.js']:
    shutil.copy2(src / name, root / 'src/lib' / name)
shutil.copy2(src / 'utils.js', root / 'src/lib/utils.js')
shutil.copy2(src / 'index.ts', root / 'src/utils.ts')

pages = ['Dashboard','Boards','Board','Analytics','Emergency','Guide','Glossary','HealthcareGuides','AppleGuides','Category','Courses','Course','SearchResults','MessengerVsTexting','MessengerVsTextingAndroid','MessengerVsTextingPicker']
(root / 'src/pages').mkdir(parents=True, exist_ok=True)
for name in pages:
    shutil.copy2(src / f'{name}.jsx', root / 'src/pages' / f'{name}.jsx')

(root / 'src/components').mkdir(parents=True, exist_ok=True)
for name in ['AuthLayout','UserNotRegisteredError','OAuthConsent']:
    shutil.copy2(src / f'{name}.jsx', root / 'src/components' / f'{name}.jsx')

ui = ['accordion','alert-dialog','alert','aspect-ratio','avatar','badge','breadcrumb','button','calendar','card','carousel','chart','checkbox','collapsible','command','context-menu','dialog','drawer','dropdown-menu','form','hover-card','input-otp','input','label','menubar','navigation-menu','pagination','popover','progress','radio-group','resizable','scroll-area','select','separator','sheet','sidebar','skeleton','slider','sonner','switch','table','tabs','textarea','toast','toaster','toggle-group','toggle','tooltip','use-toast']
(root / 'src/components/ui').mkdir(parents=True, exist_ok=True)
for name in ui:
    p = src / f'{name}.jsx'
    if p.exists():
        shutil.copy2(p, root / 'src/components/ui' / p.name)

(root / 'src/hooks').mkdir(parents=True, exist_ok=True)
shutil.copy2(src / 'use-mobile.jsx', root / 'src/hooks/use-mobile.jsx')

(root / 'src/components/seniors').mkdir(parents=True, exist_ok=True)
for name in ['WelcomeSection','CategoryGrid','QuickSearchSection','EmergencyHelpCard','PopularGuidesSection']:
    shutil.copy2(src / f'{name}.jsx', root / 'src/components/seniors' / f'{name}.jsx')

(root / 'src/components/board').mkdir(parents=True, exist_ok=True)
for name in ['BoardHeader','FilterPanel','GroupByMenu','GroupSection','HideMenu','NewColumnModal','NewGroupModal','NewTaskModal','PersonFilter','SortMenu','TaskEditModal','ItemRow','ColumnHeader','GroupSummary','GroupSummaryRow','TagsCell']:
    p = src / f'{name}.jsx'
    if p.exists():
        shutil.copy2(p, root / 'src/components/board' / p.name)

(root / 'src/components/board/cells').mkdir(parents=True, exist_ok=True)
for name in ['BudgetCell','CheckboxCell','DateCell','DropdownCell','NumberCell','PeopleCell','PriorityCell','StatusCell','TextCell']:
    shutil.copy2(src / f'{name}.jsx', root / 'src/components/board/cells' / f'{name}.jsx')

for sub, names in {'analytics':['AnalyticsPanel'],'automations':['AutomationsPanel'],'integrations':['IntegrationsPanel'],'views':['CalendarView','KanbanView','TimelineView']}.items():
    d = root / 'src/components/board' / sub
    d.mkdir(parents=True, exist_ok=True)
    for name in names:
        shutil.copy2(src / f'{name}.jsx', d / f'{name}.jsx')

(root / 'src/components/boards').mkdir(parents=True, exist_ok=True)
for name in ['BoardCard','CreateBoardModal','EditBoardModal']:
    shutil.copy2(src / f'{name}.jsx', root / 'src/components/boards' / f'{name}.jsx')

(root / 'src/components/dashboard').mkdir(parents=True, exist_ok=True)
for name in ['StatsOverview','RecentBoards','QuickActions','ActivityFeed','CalendarModal','InviteTeamModal']:
    shutil.copy2(src / f'{name}.jsx', root / 'src/components/dashboard' / f'{name}.jsx')

(root / 'src/api').mkdir(parents=True, exist_ok=True)
(root / 'src/api/base44Client.js').write_text("""import { createClient } from '@base44/sdk';\n\nexport const base44 = createClient({\n  appId: '68d2c3d10887bbe5530210d6',\n});\n\nexport default base44;\n""")

(root / 'src/entities').mkdir(parents=True, exist_ok=True)
(root / 'src/entities/Board.js').write_text("import { base44 } from '@/api/base44Client';\nexport const Board = base44.entities.Board;\n")
(root / 'src/entities/Glossary.js').write_text("import { base44 } from '@/api/base44Client';\nexport const Glossary = base44.entities.Glossary;\n")
(root / 'src/entities/Item.js').write_text("import { base44 } from '@/api/base44Client';\nexport const Item = base44.entities.Item;\n")
(root / 'src/entities/TechGuide.js').write_text("import { base44 } from '@/api/base44Client';\nexport const TechGuide = base44.entities.TechGuide;\n")
(root / 'src/entities/User.js').write_text("""import { base44 } from '@/api/base44Client';\nexport const User = {\n  me: async () => {\n    try { return await base44.auth.me(); } catch { return null; }\n  }\n};\n""")

(root / 'index.html').write_text('''<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="description" content="Tech Helper is a work-in-progress accessibility-focused technology support prototype." />\n    <title>Tech Helper | Friendly Technology Guidance</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>\n''')

pkg = json.loads((root / 'package.json').read_text())
pkg.get('dependencies', {}).pop('@base44/vite-plugin', None)
(root / 'package.json').write_text(json.dumps(pkg, indent=2))

(root / 'vite.config.js').write_text('''import path from 'path'\nimport { fileURLToPath } from 'url'\nimport react from '@vitejs/plugin-react'\nimport { defineConfig } from 'vite'\n\nconst __dirname = path.dirname(fileURLToPath(import.meta.url))\n\nexport default defineConfig({\n  base: '/Tech-Helper/',\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },\n  },\n  plugins: [react()],\n})\n''')

tw = (root / 'tailwind.config.js').read_text()
tw = 'import tailwindcssAnimate from "tailwindcss-animate"\n\n' + tw
tw = tw.replace('module.exports = {', 'export default {')
tw = tw.replace('plugins: [require("tailwindcss-animate")],', 'plugins: [tailwindcssAnimate],')
(root / 'tailwind.config.js').write_text(tw)

(root / 'src/App.jsx').write_text('''import { Toaster } from "@/components/ui/toaster"\nimport { QueryClientProvider } from '@tanstack/react-query'\nimport { queryClientInstance } from '@/lib/query-client'\nimport { pagesConfig } from './pages.config'\nimport { HashRouter as Router, Route, Routes } from 'react-router-dom'\nimport PageNotFound from './lib/PageNotFound'\nimport MessengerVsTexting from '@/pages/MessengerVsTexting'\nimport MessengerVsTextingAndroid from '@/pages/MessengerVsTextingAndroid'\nimport MessengerVsTextingPicker from '@/pages/MessengerVsTextingPicker'\n\nconst { Pages, Layout, mainPage } = pagesConfig\nconst mainPageKey = mainPage ?? Object.keys(Pages)[0]\nconst MainPage = mainPageKey ? Pages[mainPageKey] : <></>\n\nconst LayoutWrapper = ({ children, currentPageName }) => Layout\n  ? <Layout currentPageName={currentPageName}>{children}</Layout>\n  : <>{children}</>\n\nfunction App() {\n  return (\n    <QueryClientProvider client={queryClientInstance}>\n      <Router>\n        <Routes>\n          <Route path="/" element={<LayoutWrapper currentPageName={mainPageKey}><MainPage /></LayoutWrapper>} />\n          {Object.entries(Pages).map(([path, Page]) => (\n            <Route key={path} path={`/${path}`} element={<LayoutWrapper currentPageName={path}><Page /></LayoutWrapper>} />\n          ))}\n          <Route path="/MessengerVsTextingPicker" element={<LayoutWrapper currentPageName="MessengerVsTextingPicker"><MessengerVsTextingPicker /></LayoutWrapper>} />\n          <Route path="/MessengerVsTextingAndroid" element={<LayoutWrapper currentPageName="MessengerVsTextingAndroid"><MessengerVsTextingAndroid /></LayoutWrapper>} />\n          <Route path="/MessengerVsTexting" element={<LayoutWrapper currentPageName="MessengerVsTexting"><MessengerVsTexting /></LayoutWrapper>} />\n          <Route path="*" element={<PageNotFound />} />\n        </Routes>\n      </Router>\n      <Toaster />\n    </QueryClientProvider>\n  )\n}\n\nexport default App\n''')

pnf = root / 'src/lib/PageNotFound.jsx'
pnf.write_text(pnf.read_text().replace("window.location.href = '/'", "window.location.hash = '#/'"))

dp = root / 'src/pages/Dashboard.jsx'
t = dp.read_text()
t = t.replace('User.me(),\n        TechGuide.list("-updated_date", 10)', 'User.me().catch(() => null),\n        TechGuide.list("-updated_date", 10)')
t = t.replace("title: 'Healthcare & Medical',", "title: 'Patient Portals & Care Platforms',")
t = t.replace("description: 'Access medical services online',", "description: 'Navigate your care provider’s online tools',")
dp.write_text(t)

hp = root / 'src/pages/HealthcareGuides.jsx'
t = hp.read_text().replace('Healthcare & Medical Guides','Patient Portals & Care Platforms')
t = t.replace('Learn to manage your health online with confidence.','Step-by-step help navigating patient portals, online appointments, virtual visits, and other care-provider technology.')
hp.write_text(t)

lp = root / 'src/Layout.jsx'
t = lp.read_text()
start = t.find('      {/* Footer with helpful information */}')
if start != -1:
    end = t.find('    </div>\n  );', start)
    if end != -1:
        replacement = '''      {/* Portfolio prototype footer */}\n      <footer className="bg-white border-t-4 border-blue-200 mt-auto">\n        <div className="max-w-7xl mx-auto py-6 px-6 lg:px-8 text-center">\n          <p className="text-base font-semibold text-gray-700">Work-in-progress portfolio prototype</p>\n          <p className="text-sm text-gray-500 mt-1">Built to explore plain-language technology support for people who may need a little more help navigating digital tools.</p>\n        </div>\n      </footer>\n'''
        t = t[:start] + replacement + t[end:]
lp.write_text(t)

(root / 'README.md').write_text('''# Tech Helper\n\nTech Helper is a work-in-progress technology-support prototype originally built in Base44. This repository restores the exported React source into its intended project structure.\n\nThe project is designed around plain-language technology support for people who may be less comfortable with digital tools. Examples include device accessibility, troubleshooting, patient portals, online appointment systems, virtual-visit setup, DocuSign, and everyday communication tools.\n\n**Important:** Tech Helper does not provide medical advice or clinical guidance. Its care-related content is about navigating the technology used by care providers and related services.\n''')

shutil.rmtree(src, ignore_errors=True)
zip_file = root / '68d2c3d10887bbe5530210d6 (2).zip'
if zip_file.exists(): zip_file.unlink()
helper = root / 'scripts/reconstruct_export.py'
if helper.exists(): helper.unlink()
