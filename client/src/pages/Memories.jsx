// Services
import { getAllMemories } from "../services/MemoryApi";

const Memories = () => {
  const getMemories = async () => {
    const memories = await getAllMemories();
    console.log(memories);
    
    return memories
  };

  getMemories();

  return <section className="min-h-dvh bg-gray-950"></section>;
};

export default Memories;
