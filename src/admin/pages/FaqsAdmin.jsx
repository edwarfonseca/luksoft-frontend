import ResourceCrudPage from '../components/ResourceCrudPage';
import { faqsResource } from '../config/resources';

export default function FaqsAdmin() {
  return <ResourceCrudPage resource={faqsResource} />;
}
