package com.marketplace.backend.service.utils.queryes;

import com.marketplace.backend.exception.IllegalRequestParam;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateCommand;
import com.marketplace.backend.service.utils.queryes.strategy.QueryCreateExecutorImpl;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class ProductQueryResolverImpl implements ProductQueryResolver {
    private String catalogAlias;
    private Integer currentPage;
    private Integer pageSize;
    private final MultiValueMap<String, String> param = new LinkedMultiValueMap<>();
    private final MultiValueMap<EAttributeType,Attribute> attributes = new LinkedMultiValueMap<>();
    private String queryString;
    private Map<String, Object> queryParameters;

    @Override
    public String getSelectWithFilters() {
        return "SELECT p "+queryString;
    }

    @Override
    public String getCountWithFilters() {
        return "SELECT count (p) "+queryString;
    }

    @Override
    public Integer getCurrentPage() {
        return this.currentPage;
    }

    @Override
    public Integer getPageSize() {
        return this.pageSize;
    }

    @Override
    public String getCatalogAlias() {
        return this.catalogAlias;
    }

    public void setAttributes(List<Attribute> list) {
        List<Attribute> tempList;
        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        this.attributes.put(EAttributeType.SELECTABLE,tempList);

        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        this.attributes.put(EAttributeType.DOUBLE,tempList);

        tempList = list.stream()
                .filter(x -> x.getType().equals(EAttributeType.BOOLEAN)).toList();
        this.attributes.put(EAttributeType.BOOLEAN,tempList);

        this.completeSqlQuery();
    }

    public void resolveQuery(String httpQuery) {
        this.resolveQueryString(httpQuery);
        this.completeFields();
    }

    @Override
    public Set<String> getAttributesAlias() {
        return param.keySet();
    }

    @Override
    public Map<String, Object> getQueryParameters() {
        return this.queryParameters;
    }

    @Override
    public MultiValueMap<EAttributeType, Attribute> getAttributes() {
        return this.attributes;
    }

    @Override
    public MultiValueMap<String, String> getParameters() {
        return this.param;
    }


    private void resolveQueryString(String httpQuery) {
        if (httpQuery.isEmpty() || httpQuery.length() > 450) {
            throw new IllegalRequestParam("Не поддерживаемый запрос");
        }
        httpQuery=httpQuery.replaceAll("%2C",",");
        String[] res1 = httpQuery.split("&");
        for (String row : res1) {
            String[] row1 = row.split("=");
            if (row1.length != 2) {
                throw new IllegalRequestParam("Не поддерживаемый запрос");
            }
            String[] row2 = row1[1].split(",");
            param.addAll(row1[0], Arrays.asList(row2));
        }
    }

    private void completeFields() {
        List<String> pageList = param.remove("page");
        if(pageList==null||pageList.isEmpty()){
            this.currentPage = 1;
        }else {
            this.currentPage = Integer.parseInt(pageList.get(0));
            if(this.currentPage<1){
                this.currentPage=1;
            }
        }
        List<String> pageSizeList = param.remove("pagesize");
        if(pageSizeList==null||pageSizeList.isEmpty()){
            this.pageSize = 5;
        }else {
            this.pageSize = Integer.parseInt(pageSizeList.get(0));
            if(this.pageSize<5){
                this.pageSize=5;
            }
        }
        List<String> catalogList = param.remove("catalog");
        if(catalogList==null||catalogList.isEmpty()){
            throw new IllegalRequestParam("Не поддерживаемый запрос");
        }
        this.catalogAlias = catalogList.get(0);
    }

    private void completeSqlQuery() {
        StringBuilder sb = new StringBuilder();
        if(this.attributes.get(EAttributeType.SELECTABLE).isEmpty()){
           sb.append(0);
        }else {
            sb.append(1);
        }
        if(this.attributes.get(EAttributeType.DOUBLE).isEmpty()){
            sb.append(0);
        }else {
            sb.append(1);
        }
        if(this.attributes.get(EAttributeType.BOOLEAN).isEmpty()){
            sb.append(0);
        }else {
            sb.append(1);
        }
        QueryCreateCommand command =new QueryCreateExecutorImpl()
                .createJpqlQueryCommand(this,sb.toString());
        this.queryString = command.createQueryString();
        this.queryParameters = command.getQueryParameters();
    }



}
