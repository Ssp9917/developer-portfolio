import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';

const Projects = () => {

  return (
    <div id='projects' className="relative z-50  my-12 lg:my-24">
      {/* <div className="sticky top-10">
        <div className="w-[80px] h-[80px] bg-violet-100 rounded-full absolute -top-3 left-0 translate-x-1/2 filter blur-3xl  opacity-30"></div>
        <div className="flex items-center justify-start relative">
          <span className="bg-[#1a1443] absolute left-0  w-fit text-white px-5 py-3 text-xl rounded-md">
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-[#1a1443]"></span>
        </div>
      </div> */}

      {/* <div className="pt-24">
        <div className="flex flex-col gap-6">
          {projectsData.slice(0, 4).map((project, index) => (
            <div
              id={`sticky-card-${index + 1}`}
              key={index}
              className="sticky-card w-full mx-auto max-w-2xl sticky"
            >
              <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-[0.5s]">
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className="py-12">
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          My Projects
        </h1>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="group rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover rounded-t-xl transition-transform duration-500 transform group-hover:scale-110"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-3xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-3">
                    {project.title}
                  </h2>
                  <p className="text-white mb-6">{project.description}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-900 text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-transform transform hover:scale-105"
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
};

export default Projects;