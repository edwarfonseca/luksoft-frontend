import ResourceCrudPage from '../components/ResourceCrudPage';
import { coursesResource } from '../config/resources';

export default function CoursesAdmin() {
  return <ResourceCrudPage resource={coursesResource} />;
}
