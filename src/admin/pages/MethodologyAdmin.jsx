import ResourceCrudPage from '../components/ResourceCrudPage';
import { methodologyResource } from '../config/resources';

export default function MethodologyAdmin() {
  return <ResourceCrudPage resource={methodologyResource} />;
}
