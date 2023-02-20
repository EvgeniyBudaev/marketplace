package com.marketplace.backend.service.utils.queryes;




import com.marketplace.backend.exception.OperationNotAllowedException;

public class UrlResolverImpl implements UrlResolver {

    @Override
    public QueryParam resolveQueryString(String httpQuery) {
        QueryParamImpl param = new QueryParamImpl();
        if(httpQuery==null||httpQuery.isEmpty()){
            return loadDefault(param);
        }
        if(httpQuery.length()>450){
            throw new OperationNotAllowedException("Слишком длинный запрос");
        }
        httpQuery=httpQuery.replaceAll("%2C",",");
        String[] paramArray = httpQuery.split("&");
        for(String row: paramArray){
            String[] row1 = row.split("=");
            if (row1.length != 2) {
                continue;
            }
            switch (row1[0]) {
                case "page" -> param.setPage(Integer.valueOf(row1[1]));
                case "size" -> param.setPageSize(Integer.valueOf(row1[1]));
                case "sort" -> resolveSortedParam(param, row1);
                case "search" -> param.setSearchString(row1[1]);
                default -> throw new OperationNotAllowedException("Не поддерживаемый запрос");
            }
        }
        System.out.println(param);
        return param;
    }

    private QueryParam loadDefault(QueryParamImpl param){
        param.setPageSize(5);
        param.setPage(1);
        param.getSortedParam().put(ESortedFields.NAME, ESortDirection.ASC);
        return param;
    }

    private void resolveSortedParam(QueryParamImpl param, String[] row1){
        String[] val1 = row1[1].split(",");
        for(String val2: val1){
            String[] sortField = val2.split("_");
            if(sortField.length!=2){
                continue;
            }
            param.getSortedParam().put(ESortedFields.getByAlias(sortField[0])
                    ,ESortDirection.getByDirection(sortField[1]));
        }
    }
}
