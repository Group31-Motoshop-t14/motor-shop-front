"use client";
import { filters, ModelOption, models, Option } from "@/constants/filters";
import { HomeContext } from "@/contexts/HomeContext";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import { Button } from "../Button";
import { ModalContext } from "@/contexts/ModalContext.tsx";

interface FilterFormProps {
  show?: boolean;
}

const FilterForm = ({ show }: FilterFormProps) => {
  const { inputValues, setInputValues, clearFilter } = useContext(HomeContext);
  const { closeModal } = useContext(ModalContext);
  const [model, setModel] = useState("");
  const filteredModels: ModelOption[] = models.options.filter((e) => e.label === model);
  const modelsList: Option[] = filteredModels.length > 0 ? filteredModels[0].options : [];

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, sectionId: string) => {
      const newInputValues = { ...inputValues };

      newInputValues[sectionId] = e.target.value;

      if (sectionId === "brand") {
        delete newInputValues["model"];
      }

      setInputValues(newInputValues);
    },
    [inputValues]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //  lógica do envío do formulario
    closeModal();
  };

  return (
    <form className={show ? "m-2" : "col-span-1 hidden lg:block"}>
      {filters.map((section) => (
        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="mb-4 flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="prose-heading-6-600 text-grey0">{section.name}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                {section.id === "brand" ? (
                  section.options!.map((option, optionIdx) => (
                    <div key={option.value} className="mb-2 flex items-center">
                      <input
                        id={`filter-scrren-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        value={option.value}
                        onChange={(e) => handleInputChange(e, section.id)}
                        onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
                          setModel(e.currentTarget.value)
                        }
                        checked={inputValues[section.id] === option.value}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-scrren-${section.id}-${optionIdx}`}
                        className="prose-heading-7-500 ml-3 min-w-0 flex-1 text-gray-500">
                        {option.label}
                      </label>
                    </div>
                  ))
                ) : section.id === "model" ? (
                  modelsList.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-scrren-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        value={option.value}
                        onChange={(e) => handleInputChange(e, section.id)}
                        checked={inputValues[section.id] === option.value}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-scrren-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500">
                        {option.label}
                      </label>
                    </div>
                  ))
                ) : section.id === "km" || section.id === "price" ? (
                  <div className="flex justify-between">
                    <input
                      type="text"
                      name={`min-${section.id}`}
                      placeholder="Minimo"
                      className="h-9 w-[48%] place-content-center rounded border-none bg-grey5 text-center"
                      onChange={(e) => handleInputChange(e, `min${section.id}`)}
                    />
                    <input
                      type="text"
                      name={`max-${section.id}`}
                      placeholder="Máximo"
                      className="h-9 w-[48%] place-content-center rounded border-none bg-grey5 text-center"
                      onChange={(e) => handleInputChange(e, `max${section.id}`)}
                    />
                  </div>
                ) : (
                  section.options!.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-scrren-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        value={option.value}
                        onChange={(e) => handleInputChange(e, section.id)}
                        checked={inputValues[section.id] === option.value}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-scrren-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500">
                        {option.label}
                      </label>
                    </div>
                  ))
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
      <div className="lg:hidden">
        <Button
          size="primary"
          variant="gradient"
          color="blue"
          fullWidth={true}
          onClick={handleSubmit}>
          Ver anúncios
        </Button>
      </div>
      <div className="hidden lg:block">
        <Button
          size="primary"
          variant="gradient"
          color="blue"
          fullWidth={true}
          onClick={clearFilter}>
          Limpar filtros
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
