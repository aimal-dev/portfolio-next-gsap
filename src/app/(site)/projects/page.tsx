import { getProjects } from "@/lib/actions";
import ProjectsList from "@/components/sections/ProjectsList";

export const revalidate = 0; // Force dynamic to see new projects immediately

export default async function Page() {
  const projects = await getProjects();
  return <ProjectsList projects={projects} />;
}
