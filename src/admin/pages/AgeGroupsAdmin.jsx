import ResourceCrudPage from '../components/ResourceCrudPage';
import { ageGroupsResource } from '../config/resources';

export default function AgeGroupsAdmin() {
  return <ResourceCrudPage resource={ageGroupsResource} />;
}
