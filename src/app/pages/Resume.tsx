import { Mail, Phone, Globe, Github, Linkedin, MapPin, Printer } from 'lucide-react';
import portfolioData from '../../data/portfolio.json';
import { Link } from 'react-router';

export default function Resume() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black print:bg-white">
      {/* Print button - hidden in print mode */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-4">
        <Link
          to="/"
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Portfolio
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>

      {/* A4 Layout */}
      <div className="max-w-[210mm] mx-auto bg-white shadow-2xl print:shadow-none my-8 print:my-0 p-12 print:p-8">
        {/* Header */}
        <header className="mb-8 pb-6 border-b-2 border-gray-200">
          <h1 className="text-4xl font-bold mb-2">{portfolioData.name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{portfolioData.title}</h2>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <a href={`mailto:${portfolioData.email}`} className="text-gray-700 hover:text-cyan-600">
                {portfolioData.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              <span className="text-gray-700">{portfolioData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-gray-700">{portfolioData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-gray-500" />
              <a href={portfolioData.links.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600">
                {portfolioData.links.website.replace('https://', '')}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Github size={16} className="text-gray-500" />
              <a href={portfolioData.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600">
                GitHub Profile
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-gray-500" />
              <a href={portfolioData.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">Professional Summary</h3>
          <p className="text-gray-700 leading-relaxed">{portfolioData.about}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">Experience</h3>
          <div className="space-y-4">
            {portfolioData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{exp.role}</h4>
                  <span className="text-sm text-gray-600">{exp.period}</span>
                </div>
                <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">Key Projects</h3>
          <div className="space-y-4">
            {portfolioData.projects.filter(p => p.featured).map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{project.title}</h4>
                  <span className="text-sm text-gray-600">{project.year}</span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{project.type}</p>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Countries Visited */}
        <section className="mb-8 print:break-inside-avoid">
          <h3 className="text-xl font-bold mb-3 text-gray-900 border-b border-gray-300 pb-2">Countries Visited</h3>
          <p className="text-gray-700 mb-2">
            Experienced traveler with visits to {portfolioData.countriesVisited.length} countries across multiple continents.
          </p>
          <div className="text-sm text-gray-600">
            {portfolioData.countriesVisited.join(', ')}
          </div>
        </section>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white;
          }
          
          @page {
            size: A4;
            margin: 1cm;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
