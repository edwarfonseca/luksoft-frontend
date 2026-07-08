import { useState } from 'react';
import Button from '../../components/common/Button';
import DataTable from './DataTable';
import FormModal from './FormModal';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from './ToastProvider';
import useCrudResource from '../hooks/useCrudResource';
import { slugify } from '../../lib/slugify';

/**
 * Página de administración genérica: lista (DataTable) + crear/editar
 * (FormModal) + eliminar con confirmación, configurada declarativamente
 * por recurso (ver src/admin/config/resources.js). Cada página real
 * (CoursesAdmin, TestimonialsAdmin, etc.) es solo `<ResourceCrudPage resource={...} />`.
 */
export default function ResourceCrudPage({ resource }) {
  const crud = useCrudResource(resource.endpoint);
  const { addToast } = useToast();

  const [modalState, setModalState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => setModalState({ mode: 'create', item: resource.emptyItem ?? {} });
  const openEdit = (item) => setModalState({ mode: 'edit', item });
  const closeModal = () => setModalState(null);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const payload = { ...values };

      // Al publicar por primera vez, sella la fecha automáticamente
      // (el admin no tiene que pensar en marcas de tiempo).
      if (resource.publishField && payload[resource.publishField] && !payload[resource.publishTimestampField]) {
        payload[resource.publishTimestampField] = new Date().toISOString();
      }

      if (modalState.mode === 'create') {
        if (resource.slugFrom) payload.slug = slugify(values[resource.slugFrom]);
        if (resource.orderable) payload.sortOrder = crud.total;
        await crud.create(payload);
        addToast(`Se creó correctamente: ${resource.itemLabel}.`);
      } else {
        await crud.update(modalState.item.id, payload);
        addToast(`Se actualizó correctamente: ${resource.itemLabel}.`);
      }
      closeModal();
    } catch (err) {
      addToast(err.message || 'Ocurrió un error inesperado.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await crud.remove(deleteTarget.id);
      addToast(`Se eliminó: ${resource.itemLabel}.`);
    } catch (err) {
      addToast(err.message || 'No se pudo eliminar.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">{resource.label}</h1>
          {resource.description && <p className="mt-1 text-sm text-ink-500">{resource.description}</p>}
        </div>
        <Button variant="primary" onClick={openCreate}>
          + Agregar
        </Button>
      </div>

      <DataTable
        columns={resource.columns}
        rows={crud.items}
        isLoading={crud.isLoading}
        search={crud.search}
        onSearchChange={crud.setSearch}
        searchPlaceholder={resource.searchPlaceholder}
        page={crud.page}
        pageSize={crud.pageSize}
        total={crud.total}
        onPageChange={crud.setPage}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      <FormModal
        open={Boolean(modalState)}
        title={modalState?.mode === 'create' ? `Nuevo: ${resource.itemLabel}` : `Editar: ${resource.itemLabel}`}
        fields={resource.fields}
        initialValues={modalState?.item}
        onSubmit={handleSubmit}
        onClose={closeModal}
        isSubmitting={isSubmitting}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="¿Eliminar este elemento?"
        description="Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
