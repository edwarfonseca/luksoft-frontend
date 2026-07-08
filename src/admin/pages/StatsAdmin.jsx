import ResourceCrudPage from '../components/ResourceCrudPage';
import { statsResource } from '../config/resources';

export default function StatsAdmin() {
  return <ResourceCrudPage resource={statsResource} />;
}
