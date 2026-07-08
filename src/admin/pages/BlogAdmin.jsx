import ResourceCrudPage from '../components/ResourceCrudPage';
import { blogResource } from '../config/resources';

export default function BlogAdmin() {
  return <ResourceCrudPage resource={blogResource} />;
}
