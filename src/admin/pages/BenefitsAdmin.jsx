import ResourceCrudPage from '../components/ResourceCrudPage';
import { benefitsResource } from '../config/resources';

export default function BenefitsAdmin() {
  return <ResourceCrudPage resource={benefitsResource} />;
}
