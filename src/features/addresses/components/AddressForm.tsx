"use client";

/**
 * Formulario de dirección con comboboxes en cascada con búsqueda
 * departamento → provincia → distrito.
 * Presentacional: recibe defaultValues, isSubmitting y callbacks del padre.
 * Utiliza react-hook-form + Zod para validación local.
 */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner, FaCheck, FaXmark, FaLocationDot, FaMapPin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/FormField";
import { SearchableSelect } from "@/components/shared/SearchableSelect";
import { addressSchema, type AddressSchema } from "@/features/addresses/schemas";
import {
  useDepartments,
  useProvinces,
  useDistricts,
} from "@/features/addresses/hooks";
import { ADDRESS_FORM } from "@/features/addresses/constants";

interface AddressFormProps {
  defaultValues: {
    departmentId?: number;
    provinceId?: number;
    districtId?: number;
    addressLine: string;
    reference: string;
  };
  isSubmitting: boolean;
  onSubmit: (values: AddressSchema) => void;
  onCancel: () => void;
}

/** Encabezado de sección */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {children}
      </h3>
    </div>
  );
}

export function AddressForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      departmentId: defaultValues.departmentId,
      provinceId: defaultValues.provinceId,
      districtId: defaultValues.districtId,
      addressLine: defaultValues.addressLine,
      reference: defaultValues.reference,
    },
  });

  useEffect(() => {
    reset({
      departmentId: defaultValues.departmentId,
      provinceId: defaultValues.provinceId,
      districtId: defaultValues.districtId,
      addressLine: defaultValues.addressLine,
      reference: defaultValues.reference,
    });
  }, [defaultValues, reset]);

  const departmentId = watch("departmentId");
  const provinceId = watch("provinceId");
  const districtId = watch("districtId");

  const { data: departments = [] } = useDepartments();
  const { data: provinces = [], isLoading: isLoadingProvinces } = useProvinces(
    departmentId ?? null,
  );
  const { data: districts = [], isLoading: isLoadingDistricts } = useDistricts(
    provinceId ?? null,
  );

  const handleDepartmentChange = (id: number | undefined) => {
    setValue("departmentId", id as number, { shouldValidate: true });
    setValue("provinceId", undefined as unknown as number, { shouldValidate: true });
    setValue("districtId", undefined as unknown as number, { shouldValidate: true });
  };

  const handleProvinceChange = (id: number | undefined) => {
    setValue("provinceId", id as number, { shouldValidate: true });
    setValue("districtId", undefined as unknown as number, { shouldValidate: true });
  };

  const handleDistrictChange = (id: number | undefined) => {
    setValue("districtId", id as number, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Grupo 1: ubicación jerárquica */}
      <section>
        <SectionHeading icon={FaLocationDot}>{ADDRESS_FORM.locationSection}</SectionHeading>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            label={ADDRESS_FORM.department}
            name="departmentId"
            error={errors.departmentId}
            required
          >
            <SearchableSelect
              id="departmentId"
              value={departmentId}
              onValueChange={handleDepartmentChange}
              options={departments.map((d) => ({ id: d.id, name: d.name }))}
              placeholder={ADDRESS_FORM.selectDepartment}
              searchPlaceholder={ADDRESS_FORM.searchPlaceholder}
              clearLabel={ADDRESS_FORM.clearDepartment}
              invalid={!!errors.departmentId}
            />
          </FormField>

          <FormField
            label={ADDRESS_FORM.province}
            name="provinceId"
            error={errors.provinceId}
            required
          >
            <SearchableSelect
              id="provinceId"
              value={provinceId}
              onValueChange={handleProvinceChange}
              options={provinces.map((p) => ({ id: p.id, name: p.name }))}
              placeholder={ADDRESS_FORM.selectProvince}
              searchPlaceholder={ADDRESS_FORM.searchPlaceholder}
              clearLabel={ADDRESS_FORM.clearProvince}
              disabled={!departmentId}
              loading={isLoadingProvinces}
              loadingMessage={ADDRESS_FORM.loadingProvinces}
              invalid={!!errors.provinceId}
            />
          </FormField>

          <FormField
            label={ADDRESS_FORM.district}
            name="districtId"
            error={errors.districtId}
            required
          >
            <SearchableSelect
              id="districtId"
              value={districtId}
              onValueChange={handleDistrictChange}
              options={districts.map((d) => ({ id: d.id, name: d.name }))}
              placeholder={ADDRESS_FORM.selectDistrict}
              searchPlaceholder={ADDRESS_FORM.searchPlaceholder}
              clearLabel={ADDRESS_FORM.clearDistrict}
              disabled={!provinceId}
              loading={isLoadingDistricts}
              loadingMessage={ADDRESS_FORM.loadingDistricts}
              invalid={!!errors.districtId}
            />
          </FormField>
        </div>
      </section>

      {/* Grupo 2: detalle de la dirección */}
      <section className="border-t border-border pt-6">
        <SectionHeading icon={FaMapPin}>{ADDRESS_FORM.detailsSection}</SectionHeading>

        <div className="space-y-4">
          <FormField
            label={ADDRESS_FORM.addressLine}
            name="addressLine"
            error={errors.addressLine}
            required
          >
            <Input
              id="addressLine"
              placeholder={ADDRESS_FORM.addressLinePlaceholder}
              {...register("addressLine")}
            />
          </FormField>

          <FormField
            label={ADDRESS_FORM.reference}
            name="reference"
            error={errors.reference}
            required
          >
            <Input
              id="reference"
              placeholder={ADDRESS_FORM.referencePlaceholder}
              {...register("reference")}
            />
          </FormField>
        </div>
      </section>

      {/* Acciones */}
      <div className="flex gap-3 border-t border-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          size="lg"
          className="flex-1"
        >
          <FaXmark className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          {ADDRESS_FORM.cancel}
        </Button>
        <Button type="submit" disabled={isSubmitting} size="lg" className="flex-1">
          {isSubmitting ? (
            <>
              <FaSpinner className="mr-2 h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              {ADDRESS_FORM.saving}
            </>
          ) : (
            <>
              <FaCheck className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
              {ADDRESS_FORM.save}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}