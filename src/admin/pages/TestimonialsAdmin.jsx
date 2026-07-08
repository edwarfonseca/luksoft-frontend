import ResourceCrudPage from '../components/ResourceCrudPage';
import { testimonialsResource } from '../config/resources';

export default function TestimonialsAdmin() {
  return <ResourceCrudPage resource={testimonialsResource} />;
}
