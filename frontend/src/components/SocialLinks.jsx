import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

      <a
        href="https://www.linkedin.com/in/kishorrj/"
        target="_blank"
        className="icon-btn"
      >
        <FaLinkedin size={18} />
      </a>

      <a
        href="https://github.com/kishorrjeyachandran"
        target="_blank"
        className="icon-btn"
      >
        <FaGithub size={18} />
      </a>

      <a
        href="https://kishorrj.vercel.app/"
        target="_blank"
        className="icon-btn"
      >
        <FaGlobe size={18} />
      </a>

    </div>
  );
};

export default SocialLinks;