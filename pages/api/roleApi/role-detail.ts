import { NextApiRequest, NextApiResponse } from "next";
import { failCode, successCode, errorCode } from "../../../utils/response";
import * as bcrypt from "bcrypt-ts";
import initModels from "../../../models/init-models";
import sequelize from "../../../models/config";

const model = initModels(sequelize);

interface T {
  res: NextApiResponse;
  req: NextApiRequest;
}
export default async function getAllRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "PUT") {
      let { id } = req.body;


      let data: any = []
      console.log(id.length)
      if (id.length > 1) {
        for (let i = 0; i < id.length; i++) {
          data.push(await model.Roles.findAll({
            where: {
              id: id[i]
            }
          }))
        }
      }
      else {
        data = await model.Roles.findAll({
          where: {
            id
          }
        })
      }
      successCode(res, data, "Role detail");
    }

    // if (req.method === "POST") {
    //   let { userRole } = req.body;
    //   let data: any = []
    //   for (let i = 0; i <= userRole.length; i++) {
    //     await model.Users.findAll({
    //       where: {
    //         userRole: userRole[i],
    //       },
    //     })
    //       .then((result) => {
   

    //         return data.push(result.map(e => e.dataValues))
    //       })
    //       .catch((err: any) => {
    //         console.log(err);
    //       });

    //   }

    //   successCode(res, data, "tim thanh cong");

    // } else {
    //   failCode(res, req, "Error method");
    // }
  } catch (error: any) {
    return errorCode(error, "Delete unsuccess");
  }
}