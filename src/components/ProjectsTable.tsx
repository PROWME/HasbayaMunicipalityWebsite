"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import UpdateProjectsDialog from "./UpdateProjectsDialog";

interface ProjectsItem {
  id: number;
  images: string[];
  title_first_lang: string;
  title_english: string;
  description_first_lang: string;
  description_english: string;
  createdAt: string;
}

const ProjectsTable = () => {
  const { t } = useTranslation("mainInfo");
  const [projectsList, setProjectsList] = useState<ProjectsItem[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<ProjectsItem | null>(
    null
  );
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectsToDelete, setProjectsToDelete] = useState<ProjectsItem | null>(
    null
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "/api/projects/getAllProjects",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setProjectsList(response.data);
    } catch (err) {
      console.error(err);
      toast.error(t("admin.fetchErrorProjects"));
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `/api/projects/deleteProjects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success(t("admin.deleteSuccessProjects"));
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(t("admin.deleteErrorProjects"));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          mt: 3,
          overflowX: "auto",
          maxWidth: "100%",
        }}
      >
        <Table aria-label="projects table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{t("admin.image")}</TableCell>
              <TableCell>{t("admin.titleAr")}</TableCell>
              <TableCell>{t("admin.titleEn")}</TableCell>
              <TableCell>{t("admin.descAr")}</TableCell>
              <TableCell>{t("admin.descEn")}</TableCell>
              <TableCell>{t("admin.createdAt")}</TableCell>
              <TableCell align="center">{t("admin.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Image
                      src={`${item.images[0]}`}
                      alt="projects"
                      width={80}
                      height={56}
                      className="rounded object-cover 
                      cursor-pointer ms-auto"
                      onClick={() => {
                        setSelectedProjects(item);
                        setShowImagePreview(true);
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.title_first_lang}</TableCell>
                  <TableCell>{item.title_english}</TableCell>
                  <TableCell>{item.description_first_lang}</TableCell>
                  <TableCell>{item.description_english}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <IconButton
                        onClick={() => {
                          setSelectedProjects(item);
                          setShowUpdateDialog(true);
                        }}
                        color="primary"
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setProjectsToDelete(item);
                          setShowDeleteConfirm(true);
                        }}
                        color="error"
                      >
                        <FiTrash2 />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projectsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t("pagination.rowsPerPage")}
          labelDisplayedRows={({ from, to, count }) =>
            `${t("pagination.displayedRows", { from, to, count })}`
          }
        />
      </TableContainer>

      {showUpdateDialog && selectedProjects && (
        <UpdateProjectsDialog
          projectsItem={selectedProjects}
          onClose={() => setShowUpdateDialog(false)}
          onSuccess={() => {
            setShowUpdateDialog(false);
            fetchProjects();
          }}
        />
      )}

      {showImagePreview && selectedProjects && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div
            className="bg-white p-4 rounded-lg max-w-4xl 
          w-11/12 relative overflow-y-auto max-h-[90vh] space-y-5"
          >
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute top-3 right-3 text-mossGreen hover:opacity-80"
            >
              <FiX size={24} />
            </button>
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProjects.images.map((imgPath, index) => (
                <Image
                  key={index}
                  src={`${imgPath}`}
                  alt={`Preview ${index + 1}`}
                  width={500}
                  height={300}
                  className="rounded object-cover w-full h-auto"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && projectsToDelete && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-6 px-3 rounded-lg shadow-md w-full max-w-sm ">
            <p className="text-lg font-semibold mb-4 text-darkOlive pb-3">
              {t("admin.confirmDeleteTitleProject")}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                {t("admin.cancel")}
              </button>
              <button
                onClick={async () => {
                  await handleDelete(projectsToDelete.id);
                  setShowDeleteConfirm(false);
                  setProjectsToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {t("admin.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsTable;
