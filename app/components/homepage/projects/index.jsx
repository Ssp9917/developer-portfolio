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
                className="group relative rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 bg-gray-800 p-6"
              >
                {/* Project Image */}
                <div className="relative mb-4">
                  <img
                    className="w-full h-64 object-cover rounded-lg transition-transform duration-500 transform group-hover:scale-110"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>

                {/* Project Details */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  {/* Buttons */}
                  <div className="flex justify-center space-x-4 mt-4">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300  hover:from-pink-500 hover:to-violet-600"
                      >
                        <button className="px-5 text-xs md:px-5 py-2 md:py-2 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                          Live
                        </button>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 px-5 pe-5 flex item hover:from-pink-500 hover:to-violet-600"
                      >
                        <button>
                          GitHub
                        </button>

                      </a>
                    )}
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