package com.mfpe.claimsmicroservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "claims")
@Getter
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Claim {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "claim_seq")
    @GenericGenerator(
        name = "claim_seq", 
        strategy = "com.mfpe.claimsmicroservice.model.StringPrefixedSequenceIdGenerator", 
        parameters = {
            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "Claim_"),
            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%03d") })
    @Column(name="CID")
	private String claimId;
	
    @Column(name="Status")	
	private String status;
    
    @Column(name="Description")	
	private String description;
    
    @Column(name="Remarks")	
	private String remarks;
    
    @Column(name="Claim_Amount")	
	private double claimAmount;

   
    @Column(name="hospitalId")
    private String hospitalId;
    
  
    @Column(name="benefitId")
    private String benefitId;
    
    @Column(name="PolicyId")
    private String policyId;
    
    @Column(name="MemberId")
    private String memberId;
}
