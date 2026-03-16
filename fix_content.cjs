const fs = require('fs');
const blocksPath = './src/components/blocks.tsx';
let blocksContent = fs.readFileSync(blocksPath, 'utf8');

blocksContent = blocksContent.replace(/Cardiff/g, 'St Helens');
blocksContent = blocksContent.replace(/cardiff/g, 'sthelens');
blocksContent = blocksContent.replace(/Emergency Auto Locksmith/g, 'Emergency Locksmith');
blocksContent = blocksContent.replace(/Professional Auto Locksmith/g, 'Professional Locksmith');
blocksContent = blocksContent.replace(/Ready To Secure Your Vehicle\?/g, 'Ready To Secure Your Property?');
blocksContent = blocksContent.replace(/Don&apos;t leave your vehicle security/g, "Don&apos;t leave your property's security");
blocksContent = blocksContent.replace(/Comprehensive Auto Locksmith/g, 'Comprehensive Locksmith');
blocksContent = blocksContent.replace(/programming across St Helens\. Available 24\/7 for all your vehicle security needs\./g, 'services in St Helens. Available 24/7 for all your security needs.');
blocksContent = blocksContent.replace(/vehicle security and performance/g, 'property security');

const servicesGridStart = blocksContent.indexOf("<div className='grid md:grid-cols-3 gap-6'>");
const servicesGridEndPattern = /\}\)\)}\n\s*<\/div>/;
const match = blocksContent.substring(servicesGridStart).match(servicesGridEndPattern);
if (match) {
  const servicesGridEnd = servicesGridStart + match.index + match[0].length;
  const newGrid = `<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {config.services?.map((s) => (
            <Link
              key={s.id}
              href={\`/services/\${s.id}\`}
              className='bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-brand-orange hover:shadow-xl transition-all ease-in-out duration-500 group flex flex-col justify-between'
            >
              <div>
                <div className='w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-all ease-in-out duration-500'>
                  <ShieldCheck className='w-6 h-6' />
                </div>
                <div className='inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold mb-3 uppercase tracking-wider'>
                  {s.tag}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-orange transition-colors'>{s.title}</h3>
                <p className='text-gray-500 leading-relaxed'>{s.summary}</p>
              </div>
            </Link>
          ))}
        </div>`;
  blocksContent = blocksContent.substring(0, servicesGridStart) + newGrid + blocksContent.substring(servicesGridEnd);
  console.log("Successfully replaced services grid in DemoHome");
} else {
  console.log("Could not find services grid end pattern");
}

fs.writeFileSync(blocksPath, blocksContent, 'utf8');

const configPath = './src/data/config.json';
let configContent = fs.readFileSync(configPath, 'utf8');
const configObj = JSON.parse(configContent);
configObj.email = "info@db-locksmith-sthelens.co.uk";
const configStr = JSON.stringify(configObj, null, 2);
let fixedConfigStr = configStr.replace(/Cardiff/g, 'St Helens');
fixedConfigStr = fixedConfigStr.replace(/cardiff/g, 'sthelens');
fs.writeFileSync(configPath, fixedConfigStr, 'utf8');

console.log("Updated blocks and config successfully");
