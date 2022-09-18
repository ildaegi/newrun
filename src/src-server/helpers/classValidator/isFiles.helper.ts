import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

type UploadableFilesMime =
  | "image/jpg"
  | "image/png"
  | "image/jpeg"
  | "model/gltf+json"
  | "model/gltf-binary"
  | "application/octet-stream";

interface isFilesOptions {
  mime: UploadableFilesMime[];
}

export function IsFiles(
  options: isFilesOptions,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: "isFiles",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(values: any[], args: ValidationArguments) {
          try {
            if (!values.length) return false;

            const res = values.map((value: any) => {
              let mimetype: UploadableFilesMime;
              if (value?.headers && value.headers["content-type"]) {
                mimetype = value.headers["content-type"];
              } else if (value?.mimetype) {
                mimetype = value.mimetype;
              }

              return (options?.mime ?? []).includes(mimetype);
            });

            if (res.includes(false)) return false;

            return true;
          } catch (error) {
            return false;
          }
        },
      },
    });
  };
}
