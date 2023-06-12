'use client';
import { useWorkspacesContext } from "@/context/workspace-context";
import {
  FolderIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Overview = () => {
  const { workspaces } = useWorkspacesContext();
  const currentWorkspace = workspaces.find((workspace) => workspace.current);

  return (
    <div className="py-10 px-4">
      <div className="max-w-[48rem] mx-auto text-gray-900 space-y-10">
        <div className="border border-gray-200 rounded-md p-6">
          <h3 className="text-3xl font-medium">{currentWorkspace?.name}</h3>
          <p className="mt-3">
            Introducing FVMLearnMLDao: Empowering FVM Education through
            Collaboration and AI Guidance.
          </p>
          <div className="flex gap-8 my-7">
            <div className="flex items-center gap-1">
              <UsersIcon className="w-6 h-6 text-blue-600" />
              <span className="text-gray-400 text-sm">0</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
              <span className="text-gray-400 text-sm">0</span>
            </div>
            <div className="flex items-center gap-1">
              <FolderIcon className="w-6 h-6 text-blue-600" />
              <span className="text-gray-400 text-sm">0</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-md p-6">
          <h4 className="text-xl font-medium">About</h4>
          <p className="mt-4 text-sm text-gray-700 leading-6">
            FVMCopilotDAO is a decentralized autonomous organization dedicated
            to advancing education on the FileCoin Virtual Machine (FVM).
            Community members contribute their expertise, insights, and
            experiences to create a comprehensive knowledge hub within the DAO.
            We foster collaboration, innovation, and continuous learning,
            providing a platform for members to submit tutorials, share best
            practices, and engage in discussions to enhance understanding and
            proficiency with FVM. Leveraging the collective wisdom of
            FVMCopilotDAO, an AI tool powered by ChatGPT offers tailored
            guidance, answers queries, and provides step-by-step instructions
            for using the FileCoin Virtual Machine. This AI tool adapts to
            individual learning needs, ensuring an engaging and efficient
            learning experience for beginners and experienced developers alike.
            FVMCopilotDAO serves as a dynamic platform for collaboration,
            refinement, and continuous expansion of educational resources. By
            harnessing the collective intelligence of the community, we empower
            individuals to unlock the full potential of the FileCoin Virtual
            Machine. Together, we foster a thriving ecosystem of knowledge
            sharing and skill development. Join FVMCopilotDAO today and embark
            on a transformative learning journey with the FileCoin Virtual
            Machine. Let's democratize education, enhance adoption, and drive
            innovation within the FileCoin ecosystem. #FVMCopilotDAO
            #FVMeducation #FileCoinVirtualMachine
          </p>
        </div>
        <div className="grid grid-cols-2 border border-gray-200 rounded-md p-6">
          <div>
            <p className="text-xl">Models Used</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <p>gpt-3.5-turbo</p>
            </div>
          </div>
          <div>
            <p className="text-xl">Data Used</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <p>FVMCopilotDAO</p>
              <p>FVMCopilotDAO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
