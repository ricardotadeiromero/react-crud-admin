import React, { useEffect, useState } from 'react';
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Cardapio } from '../../model/Cardapio';
import { deleteCardapio, getCardapio } from '../../services/api';
import DataTable from '../../components/DataTable';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack } from '@mui/material';

export default function Grid() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardapio();
        setCardapios(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o cardápio:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function onEdit(params: GridRenderCellParams) {
    if(!params.row.codigo)return
    navigate('/cardapio/'+params.row.codigo)
  }

  async function onDelete(params: GridRenderCellParams) {
    if(!params.row.codigo)return
    await deleteCardapio(params.row)
    setCardapios(cardapios.filter((item)=>item.codigo!==params.row.codigo))
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Código', width: 70 },
    { field: 'principal', headerName: 'Principal', width: 100 },
    { field: 'guarnicao', headerName: 'Guarnição', width: 100 },
    { field: 'salada', headerName: 'Salada', width: 100 },
    { field: 'sobremesa', headerName: 'Sobremesa', width: 100 },
    { field: 'suco', headerName: 'Suco', width: 100 },
    {
      field: 'periodo',
      headerName: 'Período',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.periodo === 1 ? 'Almoço' : 'Janta',
    },
    {
      field: 'vegetariano',
      headerName: 'Tipo',
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.vegetariano === 1 ? 'Vegetariano' : 'Comum',
    },
    { field: 'data', headerName: 'Data', width: 100, 
      valueGetter: (params: GridValueGetterParams) => format(new Date(params.row.data), 'dd/MM/yyyy')
    },
    { field: 'actions', headerName: 'Ações', width: 100, 
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => onEdit(params)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={()=>onDelete(params)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
  ];

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <DataTable columns={columns} rows={cardapios} />
  );
}
