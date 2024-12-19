export const makeUserPayload = ({ values, newValues }) => {
    return {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        contactNo: values.contactNo,
        isdCode: values.isdCode,
        countryCode: values.countryCode,
        designation: values.designation,
        roleId: values.roleId,
        systemAccess: values.systemAccess,
        type: values.type,
        ...newValues
    }
}