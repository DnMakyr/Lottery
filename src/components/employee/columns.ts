import type { ColumnDef } from '@tanstack/vue-table'
import type { Attendant } from '@/types/attendant'

export const columns: ColumnDef<Attendant>[] = [
  {
    accessorKey: 'id',
    header: 'No.',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => row.getValue('code'),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => row.getValue('type'),
  },
]
