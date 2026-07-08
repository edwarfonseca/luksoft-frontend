import ResourceCrudPage from '../components/ResourceCrudPage';
import { galleryResource } from '../config/resources';

export default function GalleryAdmin() {
  return <ResourceCrudPage resource={galleryResource} />;
}
